import React from 'react'
import Playlist from './Playlist'
import "../styles/playlistsGrid.scss"

const PlaylistsGrid = ({ playlists, heading }) => {

    return (
        <div className="playlists-grid-outer-container">
            {heading ? <div className="heading">{heading}</div> : null}

            <div className="playlists-grid-inner-container">
                {playlists ?
                    <div className="playlists-grid-container">
                        {playlists.map((playlist, index) => {
                            return (<Playlist playlist={playlist} key={index} />)
                        })}
                    </div >
                    : null}
            </div>
        </div>
    )
}

export default PlaylistsGrid
