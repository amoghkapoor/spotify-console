import { useEffect, useState } from 'react'
import { useSpotify } from "../Spotify/SpotifyContext"
import { useParams } from "react-router-dom"
import { PlaylistsGrid, Loader } from "../Components"

let number = 0

const GenrePlaylists = () => {
    let { id } = useParams()
    const { api, refreshableCall } = useSpotify()
    const [error, setError] = useState(null)
    const [playlists, setPlaylists] = useState(null)
    const [genre, setGenre] = useState(null)

    useEffect(() => {
        let disposed = false
        refreshableCall(() => api.getPlaylistsForCategory(id, {
            limit: 50,
            locale: "en-IN",
            country: "IN"
        }))
            .then((res) => {
                if (disposed) return
                setError(null)
                setPlaylists(res.body.playlists.items)
            })
            .catch((err) => {
                if (disposed) return
                setPlaylists(null)
                setError(err)
            })

        refreshableCall(() => api.getCategory(id, {
            locale: "en-IN",
            country: "IN"
        }))
            .then((res) => {
                if (disposed) return
                setError(null)
                setGenre(res.body)
            })
            .catch((err) => {
                if (disposed) return
                setGenre(null)
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

    return (
        <>
            {genre && playlists ?
                <PlaylistsGrid heading={genre.name} playlists={playlists} styles={{
                    gridColumns: 4,
                    size: "250"
                }} />
                : <Loader />}
        </>
    )
}

export default GenrePlaylists
