import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { firebaseConfig } from './firebaseauth';
import { initializeApp } from 'firebase/app';
import './SigninForm.css';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

function SigninForm() {
    const navigate = useNavigate();
    const [emailinput, setemailinput] = useState('');
    const [passwordinput, setpasswordinput] = useState('');

    const handleemail = (event) => {
        setemailinput(event.target.value);
    };

    const handlepassword = (event) => {
        setpasswordinput(event.target.value);
    };

    const handlebuttonclick = () => {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth();
        const db = getFirestore();

        signInWithEmailAndPassword(auth, emailinput, passwordinput)
            .then((userCredential) => {
                console.log("Successfully logged in");
                const user = userCredential.user;
                localStorage.setItem('loggedInUserId', user.uid);

                // after auth, post req to create user (empty arrays for skills)
                const userData = {
                    User: {
                        Personal_info: {
                            Email: emailinput,
                            Password: passwordinput,
                        },
                        Skills: {
                            teaching_skills: [],
                            learning_skills: []
                        }
                    }
                };

                fetch('http://localhost:4000/api/users', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(userData),
                })
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Failed to create user');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("User created successfully:", data);
                    navigate('/');
                })
                .catch((error) => {
                    console.error("Error creating user:", error.message);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === "auth/invalid-credential") {
                    console.log("Incorrect email or password");
                } else {
                    console.log("Account does not exist");
                }
            });
    };

    return (
        <div className='container'>
            <div className="header">
                Sign into TalentTrade
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="email" id="email" onChange={handleemail} placeholder="Email" />
                </div>
                <div className="input">
                    <input type="password" id="password" onChange={handlepassword} placeholder="Password" />
                </div>
            </div>
            <div className="submit-container">
                <div className="submit" onClick={handlebuttonclick}>Sign in</div>
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
