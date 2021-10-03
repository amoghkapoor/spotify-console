import { useEffect, useState, useRef } from 'react'
import { useParams } from "react-router-dom"
import { useSpotify } from "../Spotify/SpotifyContext"
import { Loader, Chart } from "../Components"
import "../styles/singleTrack.scss"
import AudioPlayer from 'react-h5-audio-player'

let number = 0

const SingleTrack = () => {
    const { api, refreshableCall } = useSpotify()
    const [audioFeatures, setAudioFeatures] = useState(null)
    const [audioAnalysis, setAudioAnalysis] = useState(null)
    const [track, setTrack] = useState(null)
    const player = useRef();
    const [error, setError] = useState(null)

    let { id } = useParams()

    // eslint-disable-next-line no-unused-vars
    let seconds, bars, beats, sections, segments, key_value, mode, tempo, time_signature, preview_url, artist_href, key;

    if (track && audioAnalysis && audioFeatures) {
        seconds = Math.floor((track.duration_ms / 1000) % 60)
        if (seconds < 10) {
            seconds = "0" + seconds
        }

        bars = audioAnalysis.bars.length
        beats = audioAnalysis.beats.length
        sections = audioAnalysis.sections.length
        segments = audioAnalysis.segments.length

        key_value = audioFeatures.key
        mode = audioFeatures.mode
        tempo = Math.round(audioFeatures.tempo)
        time_signature = audioFeatures.time_signature

        preview_url = track.preview_url

    }

    const parsePitchClass = (key_value) => {
        key = key_value;

        switch (key_value) {
            case 0:
                key = 'C';
                break;
            case 1:
                key = 'D♭';
                break;
            case 2:
                key = 'D';
                break;
            case 3:
                key = 'E♭';
                break;
            case 4:
                key = 'E';
                break;
            case 5:
                key = 'F';
                break;
            case 6:
                key = 'G♭';
                break;
            case 7:
                key = 'G';
                break;
            case 8:
                key = 'A♭';
                break;
            case 9:
                key = 'A';
                break;
            case 10:
                key = 'B♭';
                break;
            case 11:
                key = 'B';
                break;
            default:
                key = null;
        }
        return key
    }

    const audioFunction = () => {
        player.current.audio.current.play();
    };

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
                console.log(res.body)
                setAudioFeatures(res.body)
                setError(null)
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

    if (error) {
        console.error(error)
    }

    return (
        <div className="track-outer-container">
            {track && audioAnalysis && audioFeatures ?
                <div className="track-inner-container">
                    <div className="track">
                        <img
                            src={track.album["images"][0].url}
                            alt={track.name}
                            className="track-image" />
                        <div className="track-metadata">
                            <div className="track-name">{track.name}</div>
                            <div className="track-artists">
                                {track.artists.map((artist, i) => (
                                    <a href={artist_href = `/artist/${artist.id}`} key={i}>
                                        {artist.name}
                                        {track.artists.length > 0 && i === track.artists.length - 1 ? '' : ','}
                                        &nbsp;
                                    </a>
                                ))}
                            </div>
                            <div className="track-album">
                                <a href={track.album.external_urls.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer" className="album-name">
                                    {track.album.name}
                                </a>
                                &bull;
                                <span className="release-year">
                                    {track.album.release_date.slice(0, 4)}
                                </span>
                            </div>

                            <a href={track.external_urls["spotify"]} className="track-link" target="_blank" rel="noopener noreferrer">PLAY ON SPOTIFY</a>
                            {preview_url ?
                                <button className="track-link" onClick={() => audioFunction()}>
                                    PLAY PREVIEW
                                </button> : null}


                        </div>
                    </div>


                    <div className="features">
                        <div className="feature">
                            <div className="feature-text">
                                {Math.floor((track.duration_ms / 1000) / 60)}:{seconds}</div>
                            <div className="feature-label">Duration</div>
                        </div>
                        <div className="feature">
                            <div className="feature-text">{parsePitchClass(key_value)}</div>
                            <div className="feature-label">Key</div>
                        </div>
                        <div className="feature">
                            <div className="feature-text">{mode === 0 ? "Minor" : "Major"}</div>
                            <div className="feature-label">Modality</div>
                        </div>
                        <div className="feature">
                            <div className="feature-text">{time_signature}</div>
                            <div className="feature-label">Time Signature</div>
                        </div>
                        <div className="feature">
                            <div className="feature-text">{tempo}</div>
                            <div className="feature-label">Tempo(BPM)</div>
                        </div>
                        <div className="feature">
                            <div className="feature-text">{track.popularity}%</div>
                            <div className="feature-label">popularity</div>
                        </div>
                        <div className="feature">
                            <div className="feature-text">{bars}</div>
                            <div className="feature-label">Bars</div>
                        </div>
                        <div className="feature">
                            <div className="feature-text">{beats}</div>
                            <div className="feature-label">Beats</div>
                        </div>
                        <div className="feature">
                            <div className="feature-text">{sections}</div>
                            <div className="feature-label">Sections</div>
                        </div>
                        <div className="feature">
                            <div className="feature-text">{segments}</div>
                            <div className="feature-label">Segments</div>
                        </div>
                    </div>
                    <div className="chart-container">
                        <Chart features={audioFeatures} />
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
                    ref={player}
                /> :
                null}

        </div >
    )
}

export default SingleTrack