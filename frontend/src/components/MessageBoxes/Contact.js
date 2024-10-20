import React from 'react';
import './Contact.css';

function Contact({ chat, otherUser, displayName, isSelected, onClick }) {
    console.log("Contact props:", { chat, otherUser, displayName, isSelected });

    const name = displayName || 
                 otherUser?.User?.Personal_info?.Username || 
                 otherUser?.User?.Personal_info?.Email || 
                 "Unknown User";
    
    return (
        <div className={isSelected ? "selected-contact" : "contact"} onClick={onClick}>
            <img src="/images/user.png" className="small-profile-picture" alt={name} />
            <h3>{name}</h3>
            {!isSelected && <div className="indicator"></div>}
        </div>
    );
}

export default Contact;