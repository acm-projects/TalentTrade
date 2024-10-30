import React, { useState, useEffect, useRef } from 'react';
import "./MeetingForm.css"

const MeetingForm = ({ onClose }) => {
    const [meetingDetails, setMeetingDetails] = useState({
        title: '',
        startTime: '',
        endTime: ''
        // chatID: ''   - implement later
    });

    const [isVisible, setIsVisible] = useState(true);
    const popupRef = useRef(null);
    
    const closeWithAnimation = () => {
        setIsVisible(false);
        setTimeout(onClose, 300);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeetingDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Meeting created:', meetingDetails);
        const response = async() => await fetch('http://localhost:4000/api/users/createMeeting', {
            method: 'POST',
            body: {"chatID":"670408b7cb6fbb2da15fa75"},
            headers: {
                'Content-Type': 'application/json'
            }
        })
        onClose();
    };

    const handleOutsideClick = (e) => {
        if (popupRef.current && !popupRef.current.contains(e.target)) {
          closeWithAnimation(); // Close popup if clicked outside
        }
      };
    
    useEffect(() => {
        document.addEventListener('mousedown', handleOutsideClick); // Listen for clicks
    
        return () => {
            document.removeEventListener('mousedown', handleOutsideClick); // Cleanup on unmount
        };
      }, []);

    return (
        <div className={`popup-full ${isVisible ? 'popup-enter' : 'popup-exit'}`}>
            <div className="popup-window" ref={popupRef}>
                <div className="popup-header">Schedule a meeting</div>
                <form onSubmit={handleSubmit}>
                    <input className="edit-input" 
                    type="text" 
                    name="title" 
                    value={meetingDetails.title}
                    onChange={handleChange}
                    placeholder='Title'
                    required
                    />
                    <input className="edit-input" 
                    type="datetime-local" 
                    name="startTime" 
                    value={meetingDetails.startTime}
                    onChange={handleChange}
                    required
                    />
                    <input className="edit-input" 
                    type="datetime-local" 
                    name="endTime" 
                    value={meetingDetails.endTime}
                    onChange={handleChange}
                    required
                    />
                    
                    <button type="submit" className="popup-submit-solid">Create meeting</button>
                    <button type="button" className="popup-submit-hollow" onClick={closeWithAnimation}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default MeetingForm;