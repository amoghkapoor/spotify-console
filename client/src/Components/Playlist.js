/* eslint-disable no-unused-vars */
import React from 'react'
import "../styles/playlist.scss"
import { Link } from "react-router-dom"
import Loader from "../Components/Loader"

const Playlist = ({ playlist, styles }) => {
    let href;

    return (
        <>
            {playlist ?
                <Link to={href = `/playlist/${playlist.id}`}>
                    <div className="playlist-container">
                        <div className="playlist-image-container" style={{
                            width: `${styles.size}px`,
                            height: `${styles.size}px`
                        }}>
                            <img className="playlist-image" src={playlist.images[0].url} alt="" />
                            <div className="overlay"></div>
                        </div>
                        <div className="playlist-name">
                            {playlist.name}
                        </div>
                        <div className="playlist-tracks">
                            {playlist.tracks.total} TRACKS
                        </div>
                    </div>
                </Link>
                : <Loader />}
        </>
    )
}

export default Playlist
