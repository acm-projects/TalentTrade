import React, { useRef, useEffect } from 'react';
import MeetingForm from './MeetingForm'
import './MeetingDropdown.css';

const MeetingDropdown = ({ meetings, onClose, onCreateMeeting }) => {
    const dropdownRef = useRef(null);

    const handleClickOutside = (e) => {
        if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
            onClose();
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div ref={dropdownRef} className="dropdown-container">
            <div className="dropdown-header">
                Meetings
                <button onClick={onCreateMeeting} className="messages-header-button"><img src={"/images/add.svg"} alt="add" className="messages-header-button" draggable="false"/></button>
                </div>
            <div className="dropdown-scroll-container"> {/* New scroll container */}
                {meetings.length > 0 ? (
                    <ul className="meeting-list">
                        {meetings.map((meeting, index) => (
                            <li key={index} className="meeting-item">
                                <div className="meeting-title">{meeting.title}</div>
                                <div className="align-right">
                                    <div className="join-button">Join</div>
                                </div>
                                <div className="meeting-time">{meeting.startTime} - {meeting.endTime}</div>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p>No meetings scheduled.</p>
                )}
            </div>
        </div>
    );
};

export default MeetingDropdown;
