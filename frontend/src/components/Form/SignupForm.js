import React from 'react'
import { Link } from 'react-router-dom'
import './SignupForm.css'

function SignupForm() {
    return (
        <div className='container'>
            <div className="header">
                Sign up for TalentTrade
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="text" id="username" placeholder="Username" />
                </div>
                <div className="input">
                    <input type="email" id="email" placeholder="Email" />
                </div>
                <div className="input">
                    <input type="password" id="password" placeholder="Password" />
                </div>
            </div>
            <div className="submit-container">
                <div className="submit">Sign up</div>
            </div>
            <div className="text">
                <div className="redirect">
                    <span>Already have an account? <Link to="/signin" class="link">Sign in</Link></span>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;