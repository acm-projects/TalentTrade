import React from 'react'
import { Link } from 'react-router-dom'
import './SigninForm.css'

function SigninForm() {
    return (
        <div className='container'>
            <div className="header">
                Sign into TalentTrade
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="email" id="email" placeholder="Email" />
                </div>
                <div className="input">
                    <input type="password" id="password" placeholder="Password" />
                </div>
            </div>
            <div className="submit-container">
                <div className="submit">Sign in</div>
            </div>
            <div className="text">
                <div className="redirect">
                    <span>Don't have an account? <Link to="/signup" class="link">Sign up</Link></span>
                </div>
            </div>
        </div>
    );
}

export default SigninForm;