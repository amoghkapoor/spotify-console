import React from 'react'
import "../styles/tracksRow.scss"
import Track from './Track'

const TracksRow = (props) => {
    const songs = props.songs
    return (
        <div className="tracks-row-container">
            <div className="tracks-row-header"> {props.heading ?
                <h3
                    className="heading"
                    style={{
                        fontSize: props.styles.headingSize,
                        width: "fit-content"
                    }}
                >
                    {props.heading}
                </h3> :
                null}
                {props.button ?
                    <a href="/tracks" className="tracks-button">
                        SEE MORE
                    </a> :
                    null}
            </div>
            {songs.map(track => {
                return (
                    <Track id={track.id} track={track} styles={props.styles} />
                )
            })}
        </div>
    )
}

export default TracksRow
