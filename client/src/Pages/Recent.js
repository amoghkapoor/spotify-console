import React, { useEffect, useState } from 'react'
import TracksRow from "../Components/TracksRow"
import { useSpotify } from "../Spotify/SpotifyContext"
import "../styles/recent.scss"

let number = 0

const Recent = () => {
    const { api, refreshableCall } = useSpotify()
    const [error, setError] = useState(null)
    const [recentlyPlayed, setRecentlyPlayed] = useState([])

    useEffect(() => {
        let disposed = false
        refreshableCall(() => api.getMyRecentlyPlayedTracks())
            .then((res) => {
                if (disposed) return
                var rawData = res.body.items
                var data = rawData.map(item => {
                    return item.track
                })
                setRecentlyPlayed(data)
                setError(null)
            })
            .catch((err) => {
                if (disposed) return
                setRecentlyPlayed([])
                setError(err)
            });
        increment()
        return () => disposed = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [number])

    const increment = () => {
        number += 1
    }

    if (error != null) {
        return <span className="error">{error.message}</span>
    }

    if (error) {
        console.error(error)
    }

    return (
        <div className="container">

            <div className="recent-container">
                <TracksRow heading="Recently played tracks" songs={recentlyPlayed} styles={
                    { headingSize: "2rem" }
                } />
            </div>
        </div>
    )
}

export default Recent
