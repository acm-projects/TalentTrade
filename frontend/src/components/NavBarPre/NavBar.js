import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'


function NavBarPre() {
    return (
        <>
            <nav className="navbar">
                <div class="navbar-left">
                    <Link to="/" className="user-icon">
                        <img src={"/images/logo.svg"} alt="logo" class="logo" />
                    </Link>
                </div>
                <div className='navbar-right'>
                    <Link to="/browse" class="nav-string">
                        Browse
                    </Link>
                    <Link to="/FAQ" class="nav-string">
                        FAQ
                    </Link>

                    <Link to="/signin" class="nav-button-outlined">
                        Sign in
                    </Link>

                    <Link to="/signin" class="nav-button-solid">
                        Sign up
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default NavBarPre