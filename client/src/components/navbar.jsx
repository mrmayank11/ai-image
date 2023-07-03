import React from 'react'
import { download, logo, preview, } from '../assets/index.js'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <div className='flex p-2 mb-9 justify-between shadow-sm items-center px-4'>
            <Link to={'/'}><img src={logo} alt="logo" srcset="" className=' w-28 ' /></Link>
            <Link to={'/createPost'} className='bg-gradient-to-r from-green-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-white p-2 rounded-md'>Create Post</Link>
        </div>
    )
}

export default Navbar