import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseConfig } from './firebaseauth';
import { initializeApp } from 'firebase/app';
import { Link } from 'react-router-dom';
import './SigninForm.css';
import { getRequest,baseUrl } from '../../utils/services';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

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

        signInWithEmailAndPassword(auth, emailinput, passwordinput)
            .then((userCredential) => {
                console.log("Successfully logged in");
                const user = userCredential.user;
                console.log(user);
                localStorage.setItem('loggedInUserId', user.uid);
                navigate('/');
                const displaysomn=async()=>{
                const response = await getRequest(`${baseUrl}/chats/${user.email}`);
                console.log(response[0]._id);}
                displaysomn();
                
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

    const handleGoogleSignIn = () => {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth();
        const provider = new GoogleAuthProvider();

        signInWithPopup(auth, provider)
            .then((result) => {
                const user = result.user;
                console.log("Google Sign-In successful:", user);
                localStorage.setItem('loggedInUserId', user.uid);
                navigate('/');
             
            })
            .catch((error) => {
                console.error("Error with Google Sign-In:", error.message);
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
            <div className="submit-container">
                <div className="submit-google" onClick={handleGoogleSignIn}>
                    <img src={"/images/google.svg"} class="google-icon" />Sign in with Google
                </div>
            </div>
            <div className="text">
                <div className="redirect">
                    <span>Don't have an account? <Link to="/signup" className="link">Sign up</Link></span>
                </div>
            </div>
        </div>
    );
}
const app = initializeApp(firebaseConfig);
const auth=getAuth()
export const getcurrentuser=()=> auth.currentUser;

export default SigninForm;
