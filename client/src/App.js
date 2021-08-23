import { SpotifyAuthContextProvider } from './Spotify/SpotifyContext'
import MyRouter from './Router'
import "./styles/app.scss"

const App = () => {
    return (
        <SpotifyAuthContextProvider>
            <MyRouter />
        </SpotifyAuthContextProvider>
    );
}

export default App