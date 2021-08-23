import React from 'react'
import "../styles/artist.scss"

const Artist = ({ artist, size, styles }) => {
    return (
        <div
            className="artist-container"
            style={
                {
                    flexDirection: styles.flexDirection,
                    justifyContent: styles.justifyContent,
                    marginBottom: styles.marginBottom,
                }
            }
        >
            <div
                className="artist-image-container"
                style={{
                    width: size,
                    height: size,
                    marginRight: styles.marginRight,
                }}>
                <img
                    src={artist.images[0].url}
                    alt={artist.name}
                    className="artist-image"
                />
                <div className="overlay">icon</div>
            </div>
            <div className="artist-name">{artist.name}</div>
        </div>
    )
}

export default Artist
