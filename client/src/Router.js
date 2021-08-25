// MyRouter.js (rename it however you like)
import { useSpotify } from "./Spotify/SpotifyContext"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from "./Pages/Login"
import TopArtists from "./Pages/TopArtists"
import TopTracks from "./Pages/TopTracks"
import Recent from "./Pages/Recent"
import Sidebar from "./Components/Sidebar"
import Profile from "./Pages/Profile"
import SingleTrack from "./Pages/SingleTrack"


const MyRouter = () => {
    const { hasToken } = useSpotify()

    if (!hasToken) {
        // No access token available, show login screen
        return <Login />
    }

    // Access token available, show main content
    return (
        <Router>
            <Sidebar />
            <Switch>
                <Route exact path="/">
                    <Profile />
                </Route>
                <Route path="/tracks">
                    <TopTracks />
                </Route>
                <Route path="/artists">
                    <TopArtists />
                </Route>
                <Route path="/recent">
                    <Recent />
                </Route>
                <Route path="/track/:id">
                    <SingleTrack />
                </Route>
            </Switch>
        </Router>
    )
}

export default MyRouter