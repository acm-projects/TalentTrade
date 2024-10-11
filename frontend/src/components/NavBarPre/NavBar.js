import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import './NavBar.css'


function NavBarPre() {
    return (
        <>
            <nav className="navbar">
                <div className="navbar-left">
                    <Link to="/" className="user-icon">
                        <img src={"/images/logo.svg"} alt="logo" className="logo" />
                    </Link>
                </div>
                <div className='navbar-right'>

                    <Link to="/FAQ" className="nav-string">FAQ</Link>

                    {/* <Link to="/signin" class="nav-button-outlined">
                        Sign in
                    </Link>

                    <Link to="/signup" class="nav-button-solid">
                        Sign up
                    </Link> */}

                    {/* <Link to={{
                        pathname: '/signin',
                        state: { isSigningIn: true }
                    }} className="nav-button-outlined" onClick={() => console.log("Clicked sign in")}>
                        Sign in
                    </Link>

                    <Link to={{
                        pathname: '/signin',
                        state: { isSigningIn: false }
                    }} className="nav-button-solid" onClick={() => console.log("Clicked sign up")}>
                        Sign up
                    </Link> */}
                    <Link to='/signin' state={{ isSigningIn: true }} className="nav-button-outlined">
                        Sign in
                    </Link>

                    <Link to='/signin' state={{ isSigningIn: false }} className="nav-button-solid">
                        Sign up
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default NavBarPre