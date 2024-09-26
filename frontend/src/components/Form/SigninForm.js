import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
// import { firebaseConfig } from './firebaseauth';
// import { initializeApp } from 'firebase/app';
import './SigninForm.css'
import { getAuth, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
// import { getFirestore, setDoc, doc } from 'firebase/firestore'
import { auth, googleProvider, firebaseConfig} from "./firebase-config";

function SigninForm() {
    const navigate = useNavigate();
    const [emailInput, setEmailInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');
    const [error, setError] = useState('');

    const handleEmail = (event) => {
        setEmailInput(event.target.value);
    };

    const handlePassword = (event) => {
        setPasswordInput(event.target.value);
    };

    const handleButtonClick = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, emailInput, passwordInput);
            console.log("Successfully logged in");
            localStorage.setItem('loggedInUserId', userCredential.user.uid);
            navigate('/');
        } catch (error) {
            console.error("Error during sign-in:", error);
            if (error.code === "auth/invalid-credential") {
                setError("Incorrect email or password");
            } else if (error.code === "auth/user-not-found") {
                setError("Account does not exist");
            } else {
                setError("An error occurred. Please try again.");
            }
        }
    };

    const handleGoogleSignIn = async () => {
    try {
        const result = await signInWithPopup(auth, googleProvider);
        console.log(result);
        const token = await result.user.getIdToken();

        const response = await fetch("http://localhost:4000/api/protected", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: token,
        },
        });

        const userData = await response.json();
        console.log("User Data:", userData);
    } catch (error) {
        console.error("Error during sign-in:", error);
    }
};

return (
    <div className='container'>
        <div className="header">
            Sign into TalentTrade
        </div>
        <div className="inputs">
            <div className="input">
                <input type="email" id="email" onChange={handleEmail} placeholder="Email" />
            </div>
            <div className="input">
                <input type="password" id="password" onChange={handlePassword} placeholder="Password" />
            </div>
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="submit-container">
            <div className="submit" onClick={handleButtonClick}>Sign in</div>
        </div>
        <div className="submit-container">
            <button onClick={handleGoogleSignIn} className="p-3 bg-gray-400 rounded-lg">
                Sign In with Google
            </button>
        </div>
        <div className="text">
            <div className="redirect">
                <span>Don't have an account? <Link to="/signup" className="link">Sign up</Link></span>
            </div>
        </div>
    </div>
);
}

export default SigninForm;