import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { firebaseConfig } from './firebaseauth';
import { initializeApp } from 'firebase/app';
import './SigninForm.css';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';

function SignupForm() {
    const navigate = useNavigate();

    const [username, setusername] = useState('');
    const [emailinput, setemailinput] = useState('');
    const [passwordinput, setpasswordinput] = useState('');

    const handleusername = (event) => {
        setusername(event.target.value);
    };

    const handleemail = (event) => {
        setemailinput(event.target.value);
    };

    const handlepassword = (event) => {
        setpasswordinput(event.target.value);
    };

    const handlebuttonclick = () => {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth();

        createUserWithEmailAndPassword(auth, emailinput, passwordinput)
            .then((userCredential) => {
                const user = userCredential.user;

                 // after auth, post req to create user (empty arrays for skills)
                const userData = {
                    User: {
                        Personal_info: {
                            Email: emailinput,
                            Password: passwordinput,
                            Username: username || null,
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
                        throw new Error('Failed to create user in MongoDB');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log("User created successfully in MongoDB:", data);
                    navigate('/');
                })
                .catch((error) => {
                    console.error("Error during user creation in MongoDB:", error.message);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                if (errorCode === 'auth/email-already-in-use') {
                    console.log("Email already exists bruh");
                }
            });
    };

    return (
        
        <div className='container'>
            <div className="header">
                Sign up for TalentTrade
            </div>
            <div className="inputs">
                <div className="input">
                    <input type="text" id="username" value={username} onChange={handleusername} placeholder="Username"/>
                </div>
                <div className="input">
                    <input type="email" id="email" value={emailinput} onChange={handleemail} placeholder="Email" />
                </div>
                <div className="input">
                    <input type="password" id="password" value={passwordinput} onChange={handlepassword} placeholder="Password" />
                </div>
            </div>
            <div className="submit-container">
                <div className="submit" onClick={handlebuttonclick}>Sign up</div>
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