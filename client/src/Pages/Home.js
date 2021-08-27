import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"
import { useSpotify } from "../Spotify/SpotifyContext"
import PlaylistsRow from "../Components/PlaylistsRow"
import GenresGrid from "../Components/GenresGrid"
import Loader from "../Components/Loader"
import "../styles/home.scss"
import Icon from "../assets/spotify-icon.png"
import * as BsIcons from 'react-icons/bs'

let number = 0

const Home = () => {
    const { api, refreshableCall } = useSpotify()
    const [error, setError] = useState(null)
    const [featuredPlaylists, setFeaturedPlaylists] = useState(null)
    const [categories, setCategories] = useState(null)

    useEffect(() => {
        let disposed = false
        refreshableCall(() => api.getFeaturedPlaylists())
            .then((res) => {
                if (disposed) return
                setError(null)
                setFeaturedPlaylists(res.body.playlists.items)
            })
            .catch((err) => {
                if (disposed) return
                setFeaturedPlaylists(null)
                setError(err)
            })

        refreshableCall(() => api.getCategories({
            limit: 50,
            locale: "en-IN",
            country: "IN"
        }))
            .then((res) => {
                if (disposed) return
                setError(null)
                setCategories(res.body.categories.items)
            })
            .catch((err) => {
                if (disposed) return
                setCategories(null)
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
        <>
            {featuredPlaylists && categories ?
                <>
                    <div className="header">
                        <Link to="/">
                            <img src={Icon} alt="" className="icon" />
                        </Link>
                        <Link to="/search">
                            <div className="search">
                                <span>
                                    Search
                                </span>
                                <BsIcons.BsSearch />

                            </div>
                        </Link>
                    </div>
                    <PlaylistsRow
                        heading="Featured Playlists"
                        playlists={featuredPlaylists}
                    />
                    <GenresGrid
                        heading="Genres"
                        genres={categories}
                    />
                </> : <Loader />}
        </>
    )
}


export default Home
