import React from 'react'
import "../styles/artist.scss"
import { IconContext } from "react-icons"
import { Link } from "react-router-dom"
import * as AiIcons from 'react-icons/ai'

const Artist = ({ artist, size, styles }) => {
    return (
        <Link to={`/artist/${artist.id}`}>
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
                        marginBottom: styles.marginBottom,

                    }}>
                    <img
                        src={artist.images[0].url}
                        alt={artist.name}
                        className="artist-image"
                    />
                    <div className="overlay">
                        <IconContext.Provider value={{ className: "overlay-icon" }}>
                            <AiIcons.AiFillExclamationCircle />
                        </IconContext.Provider>
                    </div>
                </div>
                <div className="artist-name">{artist.name}</div>
            </div>
        </Link>
    )
}

export default Artist
