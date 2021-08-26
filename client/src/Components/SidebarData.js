import React from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import * as GiIcons from 'react-icons/gi';
import * as BsIcons from 'react-icons/bs';

export const Data = [
    {
        title: 'Home',
        path: '/',
        icon: <AiIcons.AiOutlineHome />,
        cName: 'nav-text'
    },
    {
        title: 'Profile',
        path: '/profile',
        icon: <AiIcons.AiOutlineUser />,
        cName: 'nav-text'
    },
    {
        title: 'Search',
        path: '/search',
        icon: <BsIcons.BsSearch />,
        cName: 'nav-text'
    },
    {
        title: 'Top Artists',
        path: '/artists',
        icon: <GiIcons.GiMicrophone />,
        cName: 'nav-text'
    },
    {
        title: 'Top Tracks',
        path: '/tracks',
        icon: <BsIcons.BsMusicNoteBeamed />,
        cName: 'nav-text'
    },
    {
        title: 'Recent',
        path: '/recent',
        icon: <BsIcons.BsArrowCounterclockwise />,
        cName: 'nav-text'
    },

]