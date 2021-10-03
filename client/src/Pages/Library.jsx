import { useEffect, useState } from 'react'
import { useSpotify } from "../Spotify/SpotifyContext"
import { PlaylistsGrid } from '../Components'

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

    if (error) {
        console.error(error)
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
