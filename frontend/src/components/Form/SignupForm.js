import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

function SignupForm() {
    const navigate = useNavigate();
    const { signUpWithEmail, signUpWithGoogle, authLoading } = useContext(AuthContext);

    const [username, setUsername] = useState('');
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleUsername = (event) => setUsername(event.target.value);
    const handleEmail = (event) => setEmailInput(event.target.value);
    const handlePassword = (event) => setPasswordInput(event.target.value);

    const validateForm = () => {
        if (!username || !emailInput || !passwordInput) {
            setErrorMessage('All fields are required');
            return false;
        }
        setErrorMessage('');
        return true;
    };

    const handleButtonClick = () => {
        if (validateForm()) {
            signUpWithEmail(emailInput, passwordInput, username, navigate);
        }
    };

    const handleGoogleSignIn = () => signUpWithGoogle(navigate);

    return (
        <div className='container'>
            <div className="header">
                Sign up for TalentTrade
            </div>
            <div className="inputs">
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <div className="input">
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={handleUsername}
                        placeholder="Username"
                        disabled={authLoading}
                    />
                </div>
                <div className="input">
                    <input
                        type="email"
                        id="email"
                        value={emailInput}
                        onChange={handleEmail}
                        placeholder="Email"
                        disabled={authLoading}
                    />
                </div>
                <div className="input">
                    <input
                        type="password"
                        id="password"
                        value={passwordInput}
                        onChange={handlePassword}
                        placeholder="Password"
                        disabled={authLoading}
                    />
                </div>
            </div>
            <div className="submit-container">
                <div
                    className="submit"
                    onClick={handleButtonClick}
                    style={{ cursor: authLoading ? 'not-allowed' : 'pointer' }}
                >
                    {authLoading ? 'Signing Up...' : 'Sign up'}
                </div>
            </div>
            <div className="submit-container">
                <div className="submit-google" onClick={handleGoogleSignIn}>
                    <img src={"/images/google.svg"} className="google-icon" alt="Google Sign-In" />Sign up with Google
                </div>
            </div>
            <div className="text">
                <div className="redirect">
                    <span>Already have an account? <Link to="/signin" className="link">Sign in</Link></span>
                </div>
            </div>
        </div>
    );
}

export default SignupForm;
