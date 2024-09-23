import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { firebaseConfig } from './firebaseauth';
import { initializeApp } from 'firebase/app';
import { Link } from 'react-router-dom'
import './SignupForm.css'
import {getAuth, createUserWithEmailAndPassword} from 'firebase/auth'
import { getFirestore, setDoc, doc } from 'firebase/firestore'


function SignupForm() {
    const navigate=useNavigate()

    const [username,setusername]=useState('')
    const [emailinput,setemailinput]=useState('')
    const[passwordinput,setpasswordinput]=useState('')

    const handleusername=(event)=>{
        setusername(event.target.value)
    }
    const handleemail=(event)=>{
        setemailinput(event.target.value)
    }
    const handlepassword=(event)=>{
        setpasswordinput(event.target.value)
    }
    const handlebuttonclick=()=>{

    
        const app=initializeApp(firebaseConfig)
        const auth=getAuth()
        const db=getFirestore()
    
        createUserWithEmailAndPassword(auth, emailinput, passwordinput)
        .then((userCredential)=>{
            const user=userCredential.user;
            const userData={
                email: emailinput,
                password:passwordinput,
                usernamefinal:username
            };
            console.log("Account Created!! Yay !!");
            const docRef=doc(db, "users", user.uid);
            setDoc(docRef,userData)
            .then(()=>{
                navigate('/');
            })
            .catch((error)=>{
                console.error("error writing document", error);
    
            })
          })
          .catch((error)=>{
            const errorCode=error.code;
            if(errorCode=='auth/email-already-in-use'){
                console.log("Email already exists bruh");
            }
        })
    }
    

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