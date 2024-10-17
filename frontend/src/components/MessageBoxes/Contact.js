import React from 'react'
import './Contact.css'

function Contact() {
    return (
        <div>
            <div className="contact">
                <img src={"/images/user.svg"} class="small-profile-picture" />
                <h3>Larry Jerry</h3><div className="indicator"></div>
            </div>
            <div className="selected-contact">
                <img src={"/images/user.svg"} class="small-profile-picture" />
                <h3>Steve Jones</h3>
            </div>
            <div className="contact">
                <img src={"/images/user.svg"} class="small-profile-picture" />
                <h3>Bob Robertson</h3>
            </div>
            <div className="contact">
                <img src={"/images/user.svg"} class="small-profile-picture" />
                <h3>Saul Goodman</h3>
            </div>
        </div>
    )
}

export default Contact