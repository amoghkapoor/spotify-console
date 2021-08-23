const express = require("express")
const cors = require("cors")
const SpotifyWebApi = require("spotify-web-api-node")
require("dotenv").config()

const app = express()
app.use(cors())
app.use(express.json())

app.listen(3001, () => { console.log('server is running on port 3001') });

app.post('/', function (req, res) {
    res.status(200)
});

app.post("/refresh", (req, res) => {
    const refreshToken = req.body.refreshToken

    var spotifyApi = new SpotifyWebApi({
        clientId: "929c5579854140cf8bea0a5bcf923eeb",
        clientSecret: "1ac925fe19ae432da794be312439cc40",
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
        .catch(err => console.log(err))
})

app.post("/login", (req, res) => {
    var code = req.body.code

    var spotifyApi = new SpotifyWebApi({
        clientId: "929c5579854140cf8bea0a5bcf923eeb",
        clientSecret: "1ac925fe19ae432da794be312439cc40",
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
            res.sendStatus(400)
            console.log("server", err);
        })


})

