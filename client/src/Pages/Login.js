import React, { useEffect, useState } from 'react'
import "../styles/login.scss"
import Loader from "../Components/Loader"

import { useSpotify } from '../Spotify/SpotifyContext'

const Login = () => {
    const { exchangeCode } = useSpotify()
    const [error, setError] = useState(null)

    const code = new URLSearchParams(window.location.search).get("code")

    if (error) {
        console.error(error)
    }

    useEffect(() => {
        if (!code) return // no code. do nothing.

        // if here, code available for login

        let disposed = false
        exchangeCode(code)
            .then(() => {
                if (disposed) return
                setError(null)
                window.history.pushState({ }, null, "/")
            })
            .catch(error => {
                if (disposed) return
                setError(error)
            })

        return () => disposed = true
    }, [code, exchangeCode])

    const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
    const REDIRECT_URI = "https://amogh-spotify-clone.herokuapp.com"
    const CLIENT_ID = "929c5579854140cf8bea0a5bcf923eeb"
    const RESPONSE_TYPE = "code"
    const SCOPES = [
        "user-top-read",
        "playlist-modify-public",
        "playlist-modify-private",
        "user-follow-modify",
        "user-follow-read",
        "user-library-modify",
        "playlist-read-private",
        "user-read-email",
        "user-library-read",
        "user-read-recently-played"
    ]

    const ENDPOINT = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join("%20")}`

    if (error !== null) {
        return <span className="error">{error.message}</span>
    }

    if (code) {
        // TODO: Render progress bar/spinner/throbber for "Signing in..."
        return <Loader />
    }

    // if here, no code & no error. Show login button
    // TODO: Render login button
    return (
        <div className="login-container">
            <p className="heading">Spotify Profile</p>
            <a href={ENDPOINT} className="login-button">LOGIN IN TO SPOTIFY</a>
        </div >
    )
}

export default Login
