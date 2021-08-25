import React from 'react'
import "../styles/loader.scss"

const Loader = require('react-loaders').Loader;

const LoaderComponent = () => {
    console.log(Loader)
    return (
        <div className="loader-container">
            <Loader
                type="line-scale-pulse-out"
                active
                style={
                    { transform: 'scale(1.1)' }}
            />
        </div>
    )
}

export default LoaderComponent
