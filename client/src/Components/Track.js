import React from 'react'
import "../styles/track.scss";
import { IconContext } from "react-icons"
import * as AiIcons from 'react-icons/ai'
import { Link } from "react-router-dom"

const Track = ({ track, styles }) => {
    const song = track
    let seconds = Math.floor((song.duration_ms / 1000) % 60)

    if (seconds < 10) {
        seconds = "0" + seconds
    }

    var url = `/track/${song.id}`

    return (
        <Link to={url}>
            <div
                className="track-container"
                data-track-id={song.id}
                style={{ width: styles.width }}
            >
                <div className="track-content-left">
                    <div className="track-image-container">
                        <img
                            src={song.album["images"][0].url}
                            alt={song.name}
                            className="track-image" />
                        <div className="image-overlay">
                            <IconContext.Provider value={{ className: "overlay-icon" }}>
                                <AiIcons.AiFillExclamationCircle />
                            </IconContext.Provider>
                        </div>
                    </div>

                    <div className="track-details">
                        <div className="track-name">
                            {song.name}
                        </div>

                        <div className="track-artist-album">
                            <span className="track-artist">
                                {song.artists.map(artist => {
                                    return (artist.name)
                                })
                                    .join(", ")
                                }</span>
                            &bull;
                            <span className="track-album">{song.album.name} </span>
                        </div>
                    </div>
                </div>

                <div className="track-content-right">
                    {Math.floor((song.duration_ms / 1000) / 60)}
                    :
                    {seconds}
                </div>
            </div>
        </Link>
    )
}

export default Track
