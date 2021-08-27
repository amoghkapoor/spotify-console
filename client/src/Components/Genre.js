import React from 'react'
import "../styles/genre.scss";
import { Link } from "react-router-dom"

const Genre = ({ genre }) => {
    let href = `/genre/${genre.id}`
    return (
        <Link to={href}>
            <div className="genre">
                <div className="image-container">
                    <img className="genre-image" src={genre.icons[0].url} alt="" />
                </div>
                <div className="genre-name">{genre.name}</div>
            </div>
        </Link >
    )
}

export default Genre
