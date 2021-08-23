import React, { useState, useEffect } from 'react'
import TracksRow from "../Components/TracksRow"
import "../styles/topTracks.scss"
import { useSpotify } from '../Spotify/SpotifyContext'

const TopTracks = () => {
    const { api, refreshableCall } = useSpotify()
    const [error, setError] = useState(null)
    const [range, setRange] = useState("long_term")
    const [userTopSongs, setUserTopSongs] = useState([])

    useEffect(() => {
        let disposed = false
        refreshableCall(() => api.getMyTopTracks({
            limit: 50,
            time_range: range
        }))
            .then((res) => {
                if (disposed) return
                setUserTopSongs(res.body.items)
                setError(null)
            })
            .catch((err) => {
                if (disposed) return
                setUserTopSongs([])
                setError(err)
            });

        return () => disposed = true
    });

    const toggleActive = (button) => {
        let buttons = document.querySelectorAll(".range-button")
        buttons.forEach(button => {
            button.classList.remove("active")
        })
        button.classList.add("active")
    }

    if (error != null) {
        return <span className="error">{error.message}</span>
    }

    if (setUserTopSongs.length === 0) {
        return <span className="warning">No tracks found.</span>
    }

    return (<div className="top-tracks-outer-container">
        <div className="filter-container">
            <button
                className="range-button active"
                onClick={(e) => {
                    setRange("long_term")
                    toggleActive(e.target)
                }}>
                All Time
            </button>
            <button
                className="range-button"
                onClick={(e) => {
                    setRange("medium_term")
                    toggleActive(e.target)
                }}>
                Last 6 Months
            </button>
            <button
                className="range-button"
                onClick={(e) => {
                    setRange("short_term")
                    toggleActive(e.target)
                }}>
                Last 4 Weeks
            </button>
        </div>

        <TracksRow
            heading="Top Tracks"
            songs={userTopSongs}
            styles={
                {
                    headingSize: "2rem",
                    containerWidth: "100%"
                }
            }
        />

    </div>
    )
}

export default TopTracks


