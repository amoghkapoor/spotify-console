import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useSpotify } from "../Spotify/SpotifyContext"
import PlaylistsGrid from '../Components/PlaylistsGrid'

let number = 0

const Library = () => {
    const { api, refreshableCall } = useSpotify()
    const [error, setError] = useState(null)
    const [playlists, setPlaylists] = useState(null)

    useEffect(() => {
        let disposed = false
        refreshableCall(() => api.getUserPlaylists({
            limit: 50
        }))
            .then((res) => {
                if (disposed) return
                setError(null)
                setPlaylists(res.body.items)
                console.log(res.body.items)
            })
            .catch((err) => {
                if (disposed) return
                setPlaylists(null)
                setError(err)
            })

        increment()
        return () => disposed = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [number])

    const increment = () => {
        number += 1
    }

    return (
        <div>
            <PlaylistsGrid heading="Your Playlists" playlists={playlists} styles={{
                gridColumns: 3,
                size: "350"
            }} />
        </div>
    )
}

export default Library
