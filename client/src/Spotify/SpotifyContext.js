import { useState, useEffect, useContext, createContext } from "react"
import axios from "axios"
import SpotifyWebApi from 'spotify-web-api-node';

const spotifyApi = new SpotifyWebApi({
    clientId: "929c5579854140cf8bea0a5bcf923eeb",
});

export const SpotifyAuthContext = createContext({
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
        if (tokenInfo === null) return;

        spotifyApi.setCredentials({
            accessToken: tokenInfo.accessToken,
            refreshToken: tokenInfo.refreshToken,
        })

        setStoredJSON('myApp:spotify', tokenInfo)
    }, [tokenInfo])

    function exchangeCode(code) {
        return axios
            .post("https://spotfiy-console.onrender.com/login", {
                code
            })
            .then(res => {
                const { accessToken, refreshToken, expiresIn } = res.data;
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
            .post("https://spotfiy-console.onrender.com/refresh", {
                refreshToken
            })
            .then(res => {
                const refreshedTokenInfo = {
                    accessToken: res.data.accessToken,
                    refreshToken: res.data.refreshToken || tokenInfo.refreshToken,
                    expiresAt: Date.now() + (res.data.expiresIn * 1000)
                }

                setTokenInfo(refreshedTokenInfo)

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
                throw err;
        }

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
