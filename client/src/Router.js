import { useSpotify } from "./Spotify/SpotifyContext"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login, TopArtists, TopTracks, Recent, Profile, SingleTrack, SingleArtist, Home, Search, PlaylistPage, GenrePlaylists, Library, NotFound, } from "./Pages"
import { Sidebar } from "./Components"

const MyRouter = () => {
    const { hasToken } = useSpotify()

    if (!hasToken) {
        return <Login />
    }

    return (
        <Router>
            <Sidebar />
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/profile" component={Profile} />
                <Route path="/search" component={Search} />
                <Route path="/tracks" component={TopTracks} />
                <Route path="/artists" component={TopArtists} />
                <Route path="/recent" component={Recent} />
                <Route path="/track/:id" component={SingleTrack} />
                <Route path="/artist/:id" component={SingleArtist} />
                <Route path="/playlist/:id" component={PlaylistPage} />
                <Route path="/genre/:id" component={GenrePlaylists} />
                <Route path="/library" component={Library} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

export default MyRouter