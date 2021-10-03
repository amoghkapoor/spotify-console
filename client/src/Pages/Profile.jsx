import { useEffect, useState } from 'react'
import { TracksRow, ArtistsRow, Loader } from "../Components"
import { useSpotify } from "../Spotify/SpotifyContext"
import "../styles/profile.scss"
import { logout } from "../Spotify/SpotifyContext"

let number = 0

const Dashboard = () => {
    const { api, refreshableCall } = useSpotify()
    const [error, setError] = useState(null)
    const [userName, setUserName] = useState("")
    const [userFollowers, setUserFollowers] = useState("")
    const [userImage, setUserImage] = useState([])
    const [userLink, setUserLink] = useState("")
    const [userFollowing, setUserFollowing] = useState("")
    const [userTopArtists, setUserTopArtists] = useState([])
    const [userTopSongs, setUserTopSongs] = useState([])
    const [userSavedPlaylists, setUserSavedPlaylists] = useState("")

    useEffect(() => {
        let disposed = false
        refreshableCall(() => api.getUserPlaylists())
            .then((res) => {
                if (disposed) return
                setUserSavedPlaylists(res.body.total)
                setError(null)
            })
            .catch((err) => {
                if (disposed) return
                setUserSavedPlaylists("")
                setError(err)
            })

        refreshableCall(() => api.getMyTopTracks({
            limit: 10,
            time_range: "long_term"
        }))
            .then((res) => {
                if (disposed) return
                setUserTopSongs(res.body.items)
                setError(null)
            })
            .catch((err) => {
                if (disposed) return
                setUserTopSongs([])
                setError(err)
            });

        refreshableCall(() => api.getMe())
            .then((res) => {
                if (disposed) return
                var data = res.body
                setUserName(data.display_name)
                setUserImage(data.images)
                setUserFollowers(data.followers["total"])
                setUserLink(data.external_urls.spotify)
                setError(null)
            })
            .catch((err) => {
                if (disposed) return
                setUserName("")
                setUserImage([])
                setUserFollowers("")
                setUserLink("")
                setError(err)
            });

        refreshableCall(() => api.getFollowedArtists())
            .then((res) => {
                if (disposed) return
                var data = res.body
                var artists = data.artists
                setUserFollowing(artists.total)
            })
            .catch((err) => {
                if (disposed) return
                setUserFollowing([])
                setError(err)
            });

        refreshableCall(() => api.getMyTopArtists({
            limit: 10,
            time_range: "long_term"
        }))
            .then((res) => {
                if (disposed) return
                var data = res.body
                var artists = data.items
                setUserTopArtists(artists)
                setError(null)
            })
            .catch((err) => {
                if (disposed) return
                setUserTopArtists([])
                setError(err)
            });

        increment()
        return () => disposed = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [number])

    if (error) {
        console.error(error)
    }

    const increment = () => {
        number += 1
    }

    if (!userSavedPlaylists) {
        return <Loader />
    }

    return (
        <div className="dashboard-outer-container">

            <div className="user-info">
                <div className="user-image-container">
                    {!userImage.length ?
                        <SVG /> :
                        <img src={userImage[0].url} className="user-image" alt={userName} />}
                </div>
                <a href={userLink} className="user-name">{userName}</a>
                <div className="user-data">
                    <div className="followers user-data-content">
                        <p className="user-data-value">{userFollowers}</p>
                        <p className="user-data-heading">FOLLOWERS</p>
                    </div>
                    <div className="following user-data-content">
                        <p className="user-data-value">{userFollowing}</p>
                        <p className="user-data-heading">FOLLOWING</p>
                    </div>
                    <div className="playlists user-data-content">
                        <p className="user-data-value">{userSavedPlaylists}</p>
                        <p className="user-data-heading">PLAYLISTS</p>
                    </div>
                </div>
                <button className="logout-button" onClick={() => logout()}>LOGOUT</button>
            </div>

            <div className="dashboard-split">
                <ArtistsRow
                    heading="Top Artists of All Time"
                    artists={userTopArtists}
                    button
                    styles={
                        {
                            headingSize: "1.25rem",
                            flexDirection: "row",
                            justifyContent: "flex-start",
                            marginRight: "1rem"
                        }
                    } />
                <TracksRow
                    heading="Top Tracks of All Time"
                    songs={userTopSongs}
                    button
                    styles={
                        {
                            headingSize: "1.25rem",
                            containerWidth: "35vw"
                        }} />
            </div>
        </div>
    )

}

const SVG = () => {
    return (
        <svg id="user-icon" viewBox="0 0 1024 1024" width="100%" height="100%" className="user-icon-svg"><path d="m730.06 679.64q-45.377 53.444-101.84 83.443t-120 29.999q-64.032 0-120.75-30.503t-102.6-84.451q-40.335 13.109-77.645 29.747t-53.948 26.722l-17.142 10.084q-29.747 19.159-51.175 57.729t-21.428 73.107 25.461 59.242 60.754 24.705h716.95q35.293 0 60.754-24.705t25.461-59.242-21.428-72.603-51.679-57.225q-6.554-4.033-18.907-10.84t-51.427-24.453-79.409-30.755zm-221.84 25.72q-34.285 0-67.561-14.873t-60.754-40.335-51.175-60.502-40.083-75.124-25.461-84.451-9.075-87.728q0-64.032 19.915-116.22t54.452-85.964 80.67-51.931 99.072-18.151 99.072 18.151 80.67 51.931 54.452 85.964 19.915 116.22q0 65.04-20.167 130.58t-53.948 116.72-81.426 83.443-98.568 32.268z"></path></svg>
    )
}

export default Dashboard