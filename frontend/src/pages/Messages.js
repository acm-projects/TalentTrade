import React, { useState } from 'react';
import './Messages.css';
import NavBarPost from '../components/NavBarPost/NavBar'
import Contact from '../components/MessageBoxes/Contact'
import Chat from '../components/MessageBoxes/Chat'
import MeetingForm from '../components/MeetingForm/MeetingForm'

const Messages = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    return (
        <div>
            <NavBarPost />
                <div className="contacts-container">
                    <div className="self-contact">
                        <img src={"/images/user.svg"} class="profile-picture"/>
                        <h3>Name</h3>
                    </div>
                    <div className="other-contact-containers">
                        <h3>Messages</h3>
                        <Contact />
                    </div>
                </div>
                <div className="messages-container">
                    <div className="messages-header">
                        <div className="messages-header-left">
                            <img src={"/images/user.svg"} class="profile-picture"/>
                            Steve Jones
                        </div>
                        <button onClick={openPopup} className="meeting-button"><img src={"/images/meeting.svg"} alt="meeting" className="meeting-button" draggable="false"/></button>

                        {isPopupOpen && <MeetingForm onClose={closePopup} />}
                    </div>
                    <Chat />
                </div>
        </div>
    )
}

export default Messages