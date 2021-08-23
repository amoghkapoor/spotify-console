import React from 'react'
import "../styles/track.scss";

const Track = ({ track, styles }) => {
    const song = track
    console.log(song)

    let seconds = Math.floor((song.duration_ms / 1000) % 60)

    if (seconds < 10) {
        seconds = "0" + seconds
    }

    return (
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
                        icon
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
    )
}

export default Track
