import React from 'react'
import Playlist from './Playlist'
import "../styles/playlistsRow.scss"

const PlaylistsRow = ({ playlists, heading }) => {
    return (
        <div className="playlists-row-outer-container">
            {heading ? <div className="heading">{heading}</div> : null}
            {playlists ?
                <div className="playlists-row-container">
                    {playlists.map((playlist, index) => {
                        return (<Playlist playlist={playlist} key={index} />)
                    })}
                </div >
                : null}
        </div>
    )
}

export default PlaylistsRow
