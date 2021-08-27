import React, { useEffect, useState } from 'react'
import { useSpotify } from "../Spotify/SpotifyContext"
import { useParams } from "react-router-dom"
import TracksRow from "../Components/TracksRow"
import "../styles/playlistPage.scss"
import Loader from "../Components/Loader"
import _ from "lodash"

let number = 0

const PlaylistPage = () => {
    let { id } = useParams()
    const { api, refreshableCall } = useSpotify()
    const [error, setError] = useState(null)
    const [tracks, setTracks] = useState(null)
    const [playlist, setPlaylist] = useState(null)

    useEffect(() => {
        let disposed = false
        refreshableCall(() => api.getPlaylist(id, {
            limit: 50
        }))
            .then((res) => {
                if (disposed) return
                setError(null)
                let data = res.body.tracks.items
                let songs = data.map(song => {
                    return (song.track)
                })
                setPlaylist(res.body)
                setTracks(songs)
            })
            .catch((err) => {
                if (disposed) return
                setTracks(null)
                setError(err)
            })
        increment()
        return () => disposed = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [number])

    const increment = () => {
        number += 1
    }

    if (error) {
        console.error(error)
    }

    let color, description
    if (playlist) {
        color = playlist.primary_color
        description = playlist.description
        let index = description.indexOf("Cover")
        description = description.slice(0, index)
    }

    return (
        <>
            {playlist && tracks ?
                <>
                    <div className="playlist-info" style={{ backgroundColor: color }}>
                        <div className="playlist-image-container">
                            <img src={playlist.images[0].url} className="playlist-image" alt="" />
                        </div>
                        <div className="playlist-data">
                            <a href={playlist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="playlist-name">{_.capitalize(playlist.name)}</a>
                            <div className="playlist-description">{description}</div>
                            <div className="playlist-followers">Followers: {playlist.followers.total.toLocaleString()}</div>
                            <div className="playlist-owner">{playlist.owner.display_name}</div>
                        </div>
                        <div className="overlay" />
                    </div>
                    <TracksRow songs={tracks} styles={{ width: "100%" }} />
                </>
                : <Loader />}
        </>
    )
}

export default PlaylistPage
