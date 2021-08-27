import React from 'react'
import "../styles/playlist.scss"
import { Link } from "react-router-dom"

const Playlist = ({ playlist }) => {
    let href;

    return (

        <Link to={href = `/playlist/${playlist.id}`}>
            <div className="playlist-container">
                <div className="playlist-image-container">
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
    )
}

export default Playlist
