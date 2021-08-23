import React from 'react'
import "../styles/artistsRow.scss"
import Artist from './Artist'

const ArtistsRow = (props) => {
    const artists = props.artists
    return (
        <div className="artists-outer-container" >
            <div className="artists-header">
                {props.heading ?
                    <h3
                        className="heading" style={{
                            fontSize: props.styles.headingSize,
                            paddingLeft: 0
                        }}>
                        {props.heading}
                    </h3> :
                    null
                }
                {props.button ?
                    <a href="/artists" className="artists-button">SEE MORE</a> :
                    null}
            </div>
            <div className="artists-row">
                {artists.map((artist) => {
                    return (
                        <Artist key={artist.id} artist={artist} size={55} styles={props.styles} />
                    )
                })}
            </div>
        </div >
    )
}

export default ArtistsRow
