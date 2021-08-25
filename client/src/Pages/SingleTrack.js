import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useSpotify } from "../Spotify/SpotifyContext"
import Loader from "../Components/Loader"
import "../styles/singleTrack.scss"
import AudioPlayer from 'react-h5-audio-player'

let number = 0

const SingleTrack = () => {
    const { api, refreshableCall } = useSpotify()
    const [error, setError] = useState(null)
    const [audioFeatures, setAudioFeatures] = useState(null)
    const [audioAnalysis, setAudioAnalysis] = useState(null)
    const [track, setTrack] = useState(null)
    const [data, setData] = useState(null)

    let { id } = useParams()

    let seconds;
    let bars;
    let beats;
    let sections;
    let segments;

    let key;
    let mode;
    let tempo;
    let time_signature

    let preview_url;

    if (track && audioAnalysis && audioFeatures) {
        seconds = Math.floor((track.duration_ms / 1000) % 60)
        if (seconds < 10) {
            seconds = "0" + seconds
        }

        bars = audioAnalysis.bars.length
        beats = audioAnalysis.beats.length
        sections = audioAnalysis.sections.length
        segments = audioAnalysis.segments.length

        key = audioFeatures.key
        mode = audioFeatures.mode
        tempo = Math.round(audioFeatures.tempo)
        time_signature = audioFeatures.time_signature

        preview_url = track.preview_url
    }

    useEffect(() => {

    }, [audioFeatures])

    useEffect(() => {
        let disposed = false

        refreshableCall(() => api.getTrack(id))
            .then((res) => {
                if (disposed) return
                setTrack(res.body)
                setError(null)
            })
            .catch((err) => {
                if (disposed) return
                setTrack(null)
                setError(err)
            })

        refreshableCall(() => api.getAudioFeaturesForTrack(id))
            .then((res) => {
                if (disposed) return
                setAudioFeatures(res.body)
                setError(null)
                let acousticness = res.body.acousticness
                let danceability = res.body.danceability
                let energy = res.body.energy
                let instrumentalness = res.body.instrumentalness
                let liveness = res.body.liveness
                let speechiness = res.body.speechiness
                let valence = res.body.valence
                setData([{ acousticness }, { danceability }, { energy }, { liveness }, { speechiness }, { valence }, { instrumentalness }])
            })
            .catch((err) => {
                if (disposed) return
                setAudioFeatures(null)
                setError(err)
            })

        refreshableCall(() => api.getAudioAnalysisForTrack(id))
            .then((res) => {
                if (disposed) return
                setAudioAnalysis(res.body)
                setError(null)
            })
            .catch((err) => {
                if (disposed) return
                setAudioAnalysis(null)
                setError(err)
            })

        increment()
        return () => disposed = true
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [number])

    const increment = () => {
        number += 1
    }

    return (
        <div className="track-outer-container">

            {track && audioAnalysis && audioFeatures ?
                <div className="track-inner-container">
                    <div className="track">
                        {track.name}
                        <br />
                        {track.popularity}
                        <br />
                        {track.external_urls["spotify"]}

                        <br />
                        <img
                            src={track.album["images"][0].url}
                            alt={track.name}
                            className="track-image" />
                        <br />
                        {track.artists.map(artist => {
                            return (artist.name)
                        })
                            .join(", ")
                        }
                        <br />
                        {track.album.release_date.slice(0, 4)}
                    </div>

                    <div className="track-info">
                        {bars}
                        <br />
                        {beats}
                        <br />
                        {sections}
                        <br />
                        {segments}
                        <br />
                        {Math.floor((track.duration_ms / 1000) / 60)}
                        :
                        {seconds}
                        <br />
                        {key}
                        <br />
                        {mode === 0 ? "Minor" : "Major"}
                        <br />
                        {tempo}
                        <br />
                        {time_signature}

                    </div>
                </div>
                : <Loader />}

            {preview_url ?
                <AudioPlayer
                    src={preview_url}
                    hasDefaultKeyBindings
                    showJumpControls={false}
                    showDownloadProgress={false}
                    showFilledVolume
                    customAdditionalControls={[]}
                    layout={"stacked-reverse"}
                /> :
                null}

        </div >
    )
}

export default SingleTrack
