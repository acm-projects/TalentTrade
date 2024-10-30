import React, { useState } from 'react';
import './Messages.css';
import NavBarPost from '../components/NavBarPost/NavBar'
import Contact from '../components/MessageBoxes/Contact'
import Chat from '../components/MessageBoxes/Chat'
import MeetingForm from '../components/MessagePopups/MeetingForm'
import MeetingDropdown from '../components/MessagePopups/MeetingDropdown';

const Messages = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const openPopup = () => setIsPopupOpen(true);
    const closePopup = () => setIsPopupOpen(false);

    const openDropdown = () => setIsDropdownOpen(true);
    const closeDropdown = () => setIsDropdownOpen(false);

    const meetings = [
        { title: 'Piano Lesson', startTime: '5:00 PM', endTime: '6:30 PM' },
        { title: 'Guitar Lesson', startTime: '7:00 PM', endTime: '8:00 PM'},
        { title: 'Piano Lesson', startTime: '5:00 PM', endTime: '6:30 PM' },
        { title: 'Guitar Lesson', startTime: '7:00 PM', endTime: '8:00 PM'},
        { title: 'Piano Lesson', startTime: '5:00 PM', endTime: '6:30 PM' },
        { title: 'Guitar Lesson', startTime: '7:00 PM', endTime: '8:00 PM'},
        { title: 'Piano Lesson', startTime: '5:00 PM', endTime: '6:30 PM' },
        { title: 'Guitar Lesson', startTime: '7:00 PM', endTime: '8:00 PM'},
    ];

    return (
        <div className='animate__fadeIn animate__animated fade c'> 
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
                        <div className="messages-header-section">
                            <img src={"/images/user.svg"} class="profile-picture"/>
                            Steve Jones
                        </div>
                        <button onClick={openDropdown} className="messages-header-button">
                            <img src={"/images/meeting.svg"} alt="meeting" className="messages-header-button" draggable="false"/></button>
                        {isPopupOpen && <MeetingForm onClose={closePopup} />}
                        {isDropdownOpen && (
                            <MeetingDropdown
                                meetings={meetings}
                                onClose={closeDropdown}
                                onCreateMeeting={openPopup}
                            />
                        )}
                    </div>
                    <Chat />
                </div>
        </div>
    )
}

export default Messages