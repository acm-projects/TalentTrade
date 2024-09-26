import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'


function NavBarPost() {
    return (
        <>
            <nav className="navbar">
                <div class="navbar-left">
                    <Link to="/" className="user-icon">
                        <img src={"/images/logo.svg"} class="logo" />
                    </Link>
                </div>
                <div className='navbar-right'>
                    <Link to="/browse" class="nav-string">
                        Browse
                    </Link>
                    <Link to="/FAQ" class="nav-string">
                        FAQ
                    </Link>
                    <Link to="/messages" class="messages-icon">
                        <img src={"/images/message.png"} class="navbar-icon-m" />
                    </Link>
                    <Link to="/profile" class="profile-icon">
                        <img src={"/images/user.png"} class="navbar-icon-l" />
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default NavBarPost