import { SpotifyAuthContextProvider } from './Spotify/SpotifyContext'
import Router from './Router'
import "./styles/app.scss"

const App = () => {
    return (
        <SpotifyAuthContextProvider>
            <Router />
        </SpotifyAuthContextProvider>
    );
}

export default App