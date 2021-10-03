import {Playlist} from './'
import "../styles/playlistsGrid.scss"

const PlaylistsGrid = ({ playlists, heading, styles }) => {

    return (
        <div className="playlists-grid-outer-container">
            {heading ? <div className="heading">{heading}</div> : null}

            <div className="playlists-grid-inner-container">
                {playlists ?
                    <div className="playlists-grid-container" style={{
                        gridTemplateColumns: `repeat(${styles.gridColumns}, 1fr)`
                    }}>
                        {playlists.map((playlist, index) => {
                            return (<Playlist playlist={playlist} key={index} styles={styles} />)
                        })}
                    </div >
                    : null}
            </div>
        </div>
    )
}

export default PlaylistsGrid
