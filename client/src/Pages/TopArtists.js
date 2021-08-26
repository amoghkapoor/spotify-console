import React, { useEffect, useState } from 'react'
import ArtistsGrid from '../Components/ArtistsGrid'
import { useSpotify } from "../Spotify/SpotifyContext"
import Loader from "../Components/Loader"

let number = 0

const TopArtists = () => {

    const { api, refreshableCall } = useSpotify()
    // eslint-disable-next-line no-unused-vars
    const [error, setError] = useState(null)
    const [range, setRange] = useState("long_term")
    const [userTopArtists, setUserTopArtists] = useState([])

    useEffect(() => {
        let disposed = false
        refreshableCall(() => api.getMyTopArtists({
            limit: 50,
            time_range: range
        }))
            .then((res) => {
                if (disposed) return
                setUserTopArtists(res.body.items)
                setError(null)
            })
            .catch((err) => {
                if (disposed) return
                setUserTopArtists([])
                setError(err)
            });
        increment()
        return () => disposed = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [number, range])

    const increment = () => {
        number += 1
    }

    const toggleActive = (button) => {
        let buttons = document.querySelectorAll(".range-button")
        buttons.forEach(button => {
            button.classList.remove("active")
        })
        button.classList.add("active")
    }

    return (
        <>
            {userTopArtists ?
                <div className="top-artists-outer-container">
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
                    <ArtistsGrid
                        heading="Top Artists"
                        artists={userTopArtists}
                        styles={{
                            flexDirection: "column",
                            justifyContent: "center",
                            marginBottom: "1rem",
                        }} />
                </div> : <Loader />}
        </>
    )
}

export default TopArtists