import React, { useState } from 'react';
import "./MeetingForm.css"

const MeetingForm = ({ onClose }) => {
    const [meetingDetails, setMeetingDetails] = useState({
        title: '',
        startTime: '',
        endTime: ''
        // chatID: ''   - implement later
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setMeetingDetails((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Meeting created:', meetingDetails);
        // add Zoom API
        onClose();
    };

    return (
        <div className="popup-full">
            <div className="popup-window">
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
                    <button type="button" className="popup-submit-hollow" onClick={onClose}>Cancel</button>
                </form>
            </div>
        </div>
    )
}

export default MeetingForm;