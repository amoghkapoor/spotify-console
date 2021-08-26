import React from 'react'
import { Link } from "react-router-dom"

const Home = () => {
    return (
        <div>
            <Link to="/search">
                Search
            </Link>
        </div>
    )
}

export default Home
