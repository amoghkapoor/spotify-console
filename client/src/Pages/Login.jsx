import { useEffect, useState } from "react";
import "../styles/login.scss";
import { Loader } from "../Components";

import { useSpotify } from "../Spotify/SpotifyContext";

const Login = () => {
	const { exchangeCode } = useSpotify();
	const [error, setError] = useState(null);

	const code = new URLSearchParams(window.location.search).get("code");

	if (error) {
		console.error(error);
	}

	useEffect(() => {
		if (!code) return;

		let disposed = false;
		exchangeCode(code)
			.then(() => {
				if (disposed) return;
				setError(null);
				window.history.pushState({}, null, "/");
			})
			.catch((error) => {
				if (disposed) return;
				setError(error);
			});

		return () => (disposed = true);
	}, [code, exchangeCode]);

	const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize";
	const REDIRECT_URI = "https://spotify-console.onrender.com";
	const CLIENT_ID = "929c5579854140cf8bea0a5bcf923eeb";
	const RESPONSE_TYPE = "code";
	const SCOPES = [
		"user-top-read",
		"playlist-modify-public",
		"playlist-modify-private",
		"user-follow-modify",
		"user-follow-read",
		"playlist-read-private",
		"user-read-recently-played",
	];

	const ENDPOINT = `${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&response_type=${RESPONSE_TYPE}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES.join(
		"%20"
	)}`;

	if (error !== null) {
		return <span className="error">{error.message}</span>;
	}

	if (code) {
		return <Loader />;
	}

	return (
		<div className="login-container">
			<p className="heading">Spotify Profile</p>
			<a href={ENDPOINT} className="login-button">
				LOGIN IN TO SPOTIFY
			</a>
		</div>
	);
};

export default Login;
