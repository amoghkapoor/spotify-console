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
import SingleArtist from "./Pages/SingleArtist"
import Home from "./Pages/Home"
import Search from "./Pages/Search"


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
                    <Home />
                </Route>
                <Route path="/profile">
                    <Profile />
                </Route>
                <Route path="/search">
                    <Search />
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
                <Route path="/artist/:id">
                    <SingleArtist />
                </Route>
            </Switch>
        </Router>
    )
}

export default MyRouter