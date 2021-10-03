import { useEffect, useState } from 'react'
import { useSpotify } from "../Spotify/SpotifyContext"
import { TracksRow, Loader } from "../Components"
import "../styles/search.scss"
import * as VscIcon from 'react-icons/vsc'
import * as AiIcons from 'react-icons/ai'

let number = 0

const Search = () => {
    const { api, refreshableCall } = useSpotify()
    const [error, setError] = useState(null)
    const [query, setQuery] = useState(" ")
    const [results, setResults] = useState(null)

    useEffect(() => {
        let disposed = false
        refreshableCall(() => api.searchTracks(query, { limit: 50 }))
            .then((res) => {
                if (disposed) return
                setResults(res.body.tracks.items)
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
        setQuery(" ")
    }

    const increment = () => {
        number += 1
    }

    if (error) {
        console.error(error)
    }

    return (
        <>
            {results ?
                <div className="search-container">
                    <div className="search-bar-container">
                        <div className="search-icon">
                            <AiIcons.AiOutlineSearch style={{}} />
                        </div>
                        <input
                            type="search"
                            className="search-bar"
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search for tracks"
                        />
                    </div>
                    <div className="heading">Top Results</div>
                    {results ? <TracksRow
                        songs={results}
                        styles={
                            {
                                headingSize: "2rem",
                                containerWidth: "100%"
                            }
                        }
                    /> : null}
                    {query === " " ? <div className="search-no-results">
                        <VscIcon.VscSearchStop />
                        <span>
                            No matching songs found.
                        </span>
                    </div> : null}
                </div> : <Loader />}
        </>
    )
}

export default Search
