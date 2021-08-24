import React, { useState } from 'react'
import "../styles/sidebar.scss"
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { Data } from './SidebarData';
import { IconContext } from 'react-icons';

const Sidebar = () => {
    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);
    const toggleButton = () => {
        const button = document.querySelector(".navbar")
        console.log(sidebar)
        if (!sidebar) {
            button.style.display = "none"
        }
        else {
            button.style.display = "block"
        }
    }

    return (
        <>
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
                            <Link to='#' className='menu-close'>
                                <AiIcons.AiOutlineClose />
                            </Link>
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
                </nav>
            </IconContext.Provider>
        </>
    )
}

export default Sidebar