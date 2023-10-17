require('dotenv').config()
const express = require("express")
const cors = require("cors")
const SpotifyWebApi = require("spotify-web-api-node")
const path = require("path")

const app = express()
app.use(cors())
app.use(express.json())

if (process.env.NODE_ENV === 'production') {
    app.use(express.static("client/build"))

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    })
}

const PORT = process.env.PORT || 3001

app.listen(PORT, () => { console.log(`server is running on port ${PORT}`) });

app.post('/', function (req, res) {
    res.status(200)
});

app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken
    var spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: 'http://localhost:3000',
        refreshToken
    });
    spotifyApi.refreshAccessToken()
        .then(data => {
            res.json({
                accessToken: data.body.access_token,
                expiresIn: data.body.expires_in,
            })
            spotifyApi.setAccessToken(data.body['access_token']);
        })
        .catch(err => console.error("Refresh Access Token", err))
})

app.post("/login", (req, res) => {
    var code = req.body.code
    var spotifyApi = new SpotifyWebApi({
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        redirectUri: 'http://localhost:3000'
    });
    spotifyApi.authorizationCodeGrant(code)
        .then((data) => {
            res.json({
                accessToken: data.body.access_token,
                refreshToken: data.body.refresh_token,
                expiresIn: data.body.expires_in,
            })
            spotifyApi.setAccessToken(data.body['access_token']);
            spotifyApi.setRefreshToken(data.body['refresh_token']);
        })
        .catch(err => {
            res.sendStatus(400);
            console.error("Code Grant Authorization Error", err);
        })
})