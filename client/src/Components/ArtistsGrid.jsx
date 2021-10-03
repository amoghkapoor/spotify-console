import {Artist} from './'
import "../styles/artistsGrid.scss"

const ArtistsGrid = (props) => {
    const artists = props.artists
    return (
        <div className="artists-grid-outer-container" >
            {props.heading ? <h3 className="heading">{props.heading}</h3> : null}
            <div className="artists-grid">
                {artists.map((artist) => {
                    return (
                        <Artist key={artist.id} artist={artist} size={200} styles={props.styles} />
                    )
                })}
            </div>
        </div>
    )
}

export default ArtistsGrid
