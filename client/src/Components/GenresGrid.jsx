import {Genre} from './'
import "../styles/genresGrid.scss"

const GenresGrid = ({ genres, heading }) => {
    return (
        <div className="genres-grid-outer-container">
            {heading ? <div className="heading">{heading}</div> : null}
            <div className="genres-grid-container">
                {genres ? genres.map((genre, index) => {
                    return (
                        <Genre genre={genre} key={index} />
                    )
                }) : null}
            </div>
        </div>
    )
}

export default GenresGrid
