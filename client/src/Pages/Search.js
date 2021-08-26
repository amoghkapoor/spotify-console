import React, { useEffect, useState } from 'react'
import { useSpotify } from "../Spotify/SpotifyContext"
import Loader from "../Components/Loader"
import TracksRow from "../Components/TracksRow"

let number = 0

const Search = () => {
    const { api, refreshableCall } = useSpotify()
    const [error, setError] = useState(null)
    const [query, setQuery] = useState(" ")
    const [results, setResults] = useState(null)

    useEffect(() => {
        let disposed = false
        refreshableCall(() => api.searchTracks(query))
            .then((res) => {
                if (disposed) return
                setResults(res.body.tracks.items)
                console.log(query)
                setError(null)
            })
            .catch((err) => {
                if (disposed) return
                setError(err)
            })

        increment()
        return () => disposed = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [number, query])

    if (query.length === 0) {
        console.log(query)
        setQuery(" ")
    }

    const increment = () => {
        number += 1
    }

    return (
        <div>
            <input type="text" onChange={(e) => setQuery(e.target.value)} name="" id="" />
            {results ? <TracksRow
                songs={results}
                styles={
                    {
                        headingSize: "2rem",
                        containerWidth: "100%"
                    }
                }
            /> : null}
        </div>
    )
}

export default Search
