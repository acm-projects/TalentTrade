import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseConfig } from './firebaseauth';
import { initializeApp } from 'firebase/app';
import { Link } from 'react-router-dom';
import './SigninForm.css';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';


function SigninForm() {
<<<<<<< HEAD
    const fetchUserProfileByEmail = async (email) => {
        try {
            const response = await fetch(`http://localhost:4000/api/users/email/${encodeURIComponent(email)}`, {
              method: 'GET',
              credentials: 'include',
            });
        
            const userProfile = await response.json();
            console.log(`Fetching user profile from: http://localhost:4000/api/users/email/${encodeURIComponent(email)}`);

        
            if (response.ok) {
              console.log('User profile data:', userProfile);
            } else {
                console.log(response)
              console.log('Error fetching user profile:', userProfile.message || 'Unknown error');
            }
          } catch (error) {
            console.error('Error fetching user profile:', error.message || error);
          }
        };
    const navigate=useNavigate()
=======
    const navigate = useNavigate();
    const [emailinput, setemailinput] = useState('');
    const [passwordinput, setpasswordinput] = useState('');
>>>>>>> 76ef44be5c39f8ba54c1732722d74c539054d3e6

    const handleemail = (event) => {
        setemailinput(event.target.value);
    };
    const handlepassword = (event) => {
        setpasswordinput(event.target.value);
    };
    const handlebuttonclick = () => {
        const app = initializeApp(firebaseConfig);
        const auth = getAuth();

<<<<<<< HEAD
    const handleemail=(event)=>{
        setemailinput(event.target.value)
    }
    const handlepassword=(event)=>{
        setpasswordinput(event.target.value)
    }
    const handlebuttonclick=()=>{
        const app=initializeApp(firebaseConfig)
        const auth=getAuth()
        //const db=getFirestore()

        signInWithEmailAndPassword(auth,emailinput,passwordinput)
        .then((userCredential)=>{
            console.log("Successfully logged in");
            const user=auth.currentUser;
            const mongodb = context.services.get("mongodb-atlas");
            const db = mongodb.db("userprofiles");
            user= db.users.find({userName:"Blizzy"})
            console.log(user._id.tostring())
            localStorage.setItem('loggedInUserId',user.uid);
            navigate('/');

            fetchUserProfileByEmail(emailinput)
})
        .catch((error)=>{
            const errorCode=error.code;
            if(errorCode==="auth/invalid-credential"){
            console.log("Incorrect email or password")
            }
            else{
            console.log("Account does not exist");
            }
  })
        
    }
=======
        signInWithEmailAndPassword(auth, emailinput, passwordinput)
            .then((userCredential) => {
                console.log("Successfully logged in");
                const user = userCredential.user;
                localStorage.setItem('loggedInUserId', user.uid);
                navigate('/');
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
>>>>>>> 76ef44be5c39f8ba54c1732722d74c539054d3e6

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
                <div className="submit" onClick={handleGoogleSignIn}>
                    Sign in with Google
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

export default SigninForm;
