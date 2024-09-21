import React, { useState } from "react";
import './Signin.css';
import SigninForm from '../components/Form/SigninForm';

const Signin = () => {

    const [action,setAction] = useState("Sign in");


    return (
        <div className="signin">
            <div className="fullsize">
                <div className="verticalcenter">
                    <h1>Welcome!</h1>
                    <h2>Sign in to connect and trade<br></br>
                        skills with students.</h2>
                </div>
                <div className="formcolumn"><SigninForm /></div>
            </div>
        </div>
    )
}

export default Signin