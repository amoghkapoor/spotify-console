import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useSpotify } from "../Spotify/SpotifyContext"
import Loader from "../Components/Loader"
import _ from "lodash"
import TracksRow from '../Components/TracksRow'

import "../styles/singleArtist.scss"

let number = 0

const SingleArtist = () => {
    const [artist, setArtist] = useState(null)
    const [artistTopTracks, setArtistTopTracks] = useState(null)
    const { api, refreshableCall } = useSpotify()
    const [error, setError] = useState(null)

    useEffect(() => {
        let disposed = false

        refreshableCall(() => api.getArtist(id))
            .then((res) => {
                if (disposed) return
                setArtist(res.body)
                setError(null)
            })
            .catch((err) => {
                if (disposed) return
                setArtist(null)
                setError(err)
            })

        increment()
        return () => disposed = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [number])

    const increment = () => {
        number += 1
    }
    let { id } = useParams()
    return (
        <>
            {artist ?
                <div className="artist-outer-container">

                    <div className="artist-inner-container">
                        <div className="image-container">
                            <img src={artist.images[0].url} alt={artist.name} className="image" />
                        </div>
                        <a href={artist.external_urls.spotify} target="_blank" rel="noopener noreferrer" className="artist-name">
                            {artist.name}
                        </a>
                        <div className="artist-info">
                            <div className="artist-followers">
                                <div className="label">FOLLOWERS</div>
                                {artist.followers.total.toLocaleString()}
                            </div>
                            <div className="artist-genres">
                                <div className="label">GENRES</div>
                                {artist.genres.map(genre => {
                                    return <div> {_.capitalize(genre)} </div>
                                })}
                            </div>
                            <div className="artist-popularity">
                                <div className="label">POPULARITY</div>
                                {artist.popularity}%
                            </div>
                        </div>
                    </div>
                </div>

                : <Loader />}
        </>
    )
}

export default SingleArtist
