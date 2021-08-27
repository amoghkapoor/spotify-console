import React, { useState } from 'react'
import "../styles/sidebar.scss"
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Data } from './SidebarData';
import { IconContext } from 'react-icons';
import logo from "../assets/spotify-icon.png"
import { logout } from "../Spotify/SpotifyContext"

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    const toggleButton = () => {
        const button = document.querySelector(".navbar")
        if (!sidebar) {
            button.style.display = "none"
        }
        else {
            button.style.display = "block"
        }
    }

    return (
        <div className="navbar-container">
            <IconContext.Provider value={{ color: '#fff' }}>
                <div className='navbar'>
                    <Link to='#' className='menu-bars'>
                        <FaIcons.FaBars onClick={() => {
                            showSidebar();
                            toggleButton()
                        }} />
                    </Link>
                </div>
                <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                    <ul className='nav-menu-items' onClick={() => {
                        showSidebar();
                        toggleButton()
                    }}>
                        <li className='navbar-toggle'>
                            <div className='navbar-menu'>
                                <Link to="/">
                                    <img src={logo} alt="Spotify Logo" className='navbar-logo' />
                                </Link>
                                <Link to='#' className='menu-close'>
                                    <AiIcons.AiOutlineClose />
                                </Link>
                            </div>
                        </li>
                        {Data.map((item, index) => {
                            return (
                                <li key={index} className={item.cName}>
                                    <Link to={item.path}>
                                        {item.icon}
                                        <span>{item.title}</span>
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>
                    <div className="footer">
                        <button className="logout-button" onClick={() => logout()}>Logout</button>
                        <a className="amogh" href="https://github.com/amoghkapoor" target="_blank" rel="noopener noreferrer">Made by: <span>Amogh Kapoor</span></a>
                    </div>
                </nav>
            </IconContext.Provider>
        </div>
    )
}

export default Sidebar