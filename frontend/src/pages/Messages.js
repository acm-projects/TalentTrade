import './Messages.css';
import NavBarPost from '../components/NavBarPost/NavBar';
import Contact from '../components/MessageBoxes/Contact';
import Chat from '../components/MessageBoxes/Chat';
import { useFetchRecipient } from '../hooks/useFetchRecipient';
import { useContext } from 'react';
import { ChatContext } from '../contexts/ChatContext';
import PotentialChats from '../components/chat/PotentialChats';
import { AuthContext } from '../contexts/AuthContext';
import UserChat from '../components/chat/UserChat';

const Messages = () => { 
    const { user } = useContext(AuthContext);
    const { userChats, isUserChatsLoading, userChatsError } = useContext(ChatContext);

    console.log("UserChats", userChats);

    return (
        <div>
            <PotentialChats />
            <NavBarPost />
            <div className="contacts-container">
                <div className="self-contact">
                    <img src={"/images/user.png"} className="profile-picture" alt="User profile" />
                    <h3>Username</h3>
                </div>
                <div className="other-contact-containers">
                    {isUserChatsLoading && <p>Loading chats...</p>}
                    {userChats?.map((chat, index) => (
                        <div key={index}>
                            <UserChat chat = {chat} user = {user} />
                        </div>
                    ))}
                    <h3>Messages</h3>
                    <Contact />
                </div>
            </div>
            <div className="messages-container">
                <div className="messages-header">
                    <img src={"/images/user.png"} className="profile-picture" alt="User profile" />
                    Steve Jones
                </div>
                <Chat />
            </div>
        </div>
    );
}

export default Messages;
