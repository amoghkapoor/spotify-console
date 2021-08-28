// SpotifyAuthContext.js
import React, { useState, useEffect, useContext } from "react"
import axios from "axios"
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: "929c5579854140cf8bea0a5bcf923eeb",
});

export const SpotifyAuthContext = React.createContext({
    exchangeCode: () => { throw new Error("context not loaded") },
    refreshAccessToken: () => { throw new Error("context not loaded") },
    hasToken: spotifyApi.getAccessToken() !== undefined,
    api: spotifyApi
});

export const useSpotify = () => useContext(SpotifyAuthContext);

function setStoredJSON(id, obj) {
    localStorage.setItem(id, JSON.stringify(obj));
}

function getStoredJSON(id, fallbackValue = null) {
    const storedValue = localStorage.getItem(id);
    return storedValue === null
        ? fallbackValue
        : JSON.parse(storedValue);
}

export const logout = () => {
    window.localStorage.removeItem('myApp:spotify');
    window.location.reload();
};

export function SpotifyAuthContextProvider({ children }) {
    const [tokenInfo, setTokenInfo] = useState(() => getStoredJSON('myApp:spotify', null))

    const hasToken = tokenInfo !== null

    useEffect(() => {
        if (tokenInfo === null) return; // do nothing, no tokens available

        // attach tokens to `SpotifyWebApi` instance
        spotifyApi.setCredentials({
            accessToken: tokenInfo.accessToken,
            refreshToken: tokenInfo.refreshToken,
        })

        // persist tokens
        setStoredJSON('myApp:spotify', tokenInfo)
    }, [tokenInfo])

    function exchangeCode(code) {
        return axios
            .post("https://spotify-console.herokuapp.com/login", {
                code
            })
            .then(res => {
                // TODO: Confirm whether response contains `accessToken` or `access_token`
                const { accessToken, refreshToken, expiresIn } = res.data;
                // store expiry time instead of expires in
                setTokenInfo({
                    accessToken,
                    refreshToken,
                    expiresAt: Date.now() + (expiresIn * 1000)
                });
            })
    }

    function refreshAccessToken() {
        const refreshToken = tokenInfo.refreshToken;
        return axios
            .post("https://spotify-console.herokuapp.com/refresh", {
                refreshToken
            })
            .then(res => {
                const refreshedTokenInfo = {
                    accessToken: res.data.accessToken,
                    // some refreshes may include a new refresh token!
                    refreshToken: res.data.refreshToken || tokenInfo.refreshToken,
                    // store expiry time instead of expires in
                    expiresAt: Date.now() + (res.data.expiresIn * 1000)
                }

                setTokenInfo(refreshedTokenInfo)

                // attach tokens to `SpotifyWebApi` instance
                spotifyApi.setCredentials({
                    accessToken: refreshedTokenInfo.accessToken,
                    refreshToken: refreshedTokenInfo.refreshToken,
                })

                return refreshedTokenInfo
            })
    }

    async function refreshableCall(callApiFunc) {
        if (Date.now() > tokenInfo.expiresAt)
            await refreshAccessToken();

        try {
            return await callApiFunc()
        } catch (err) {
            if (err.name !== "WebapiAuthenticationError")
                throw err; // rethrow irrelevant errors
        }

        // if here, has an authentication error, try refreshing now
        return refreshAccessToken()
            .then(callApiFunc)
    }

    return (
        <SpotifyAuthContext.Provider value={{
            api: spotifyApi,
            exchangeCode,
            hasToken,
            refreshableCall,
            refreshAccessToken
        }}>
            {children}
        </SpotifyAuthContext.Provider>
    )
}
