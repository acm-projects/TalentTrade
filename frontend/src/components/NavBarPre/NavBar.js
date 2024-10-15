import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'

function NavBarPre() {
    return (
        <>
            <nav className="navbar">
                <div class="navbar-left">
                    <Link to="/" className="user-icon hoverEnlarge">
                        <img src={"/images/logo.svg"} alt="logo" class="logo" />
                    </Link>
                </div>
                <div className='navbar-right'>
                    {/* <Link to="/browse" class="nav-string">
                        Browse
                    </Link> */}
                    <Link to="/FAQ" class="nav-string hoverEnlarge2">
                        FAQ
                    </Link>

                    <Link to="/signin" class="nav-button-outlined hoverEnlarge">
                        Sign in
                    </Link>

                    <Link to="/signup" class="nav-button-solid hoverEnlarge">
                        Sign up
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default NavBarPre