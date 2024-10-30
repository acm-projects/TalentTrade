import React, {useState} from 'react'
import { Link } from 'react-router-dom'
function NavBarPost() {
    return(
        <>
        <nav className="navbar">
            <div className="navbar-left">
                <Link to="/home" className="user-icon hoverEnlarge">
                <img src={"/images/logo.svg"} className="logo" />
                </Link>
            </div>
            <div className='navbar-right'>
                <Link to="/browse" className="nav-string hoverEnlarge2 ">
                    Browse
                </Link>
                <Link to="/FAQ" className="nav-string hoverEnlarge2 ">
                    FAQ
                </Link>
                <Link to="/settings" className="settings-icon hoverEnlarge2 ">
                    <img src={"/images/settings.png"} className="navbar-icon"/>
                </Link>
                <Link to="/messages" className="messages-icon hoverEnlarge2 ">
                        <img src={"/images/message.png"} className="navbar-icon"/>
                </Link>
                <Link to="/profile" className="profile-icon hoverEnlarge2 ">
                    <img src={"/images/user.png"} className="navbar-icon"/>
                </Link>
            </div>
        </nav>
        </>
    )
}

export default NavBarPost