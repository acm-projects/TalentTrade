import React, { useEffect, useState } from 'react';
import './Messages.css';
import NavBarPost from '../components/NavBarPost/PostNavBar';
import Contact from '../components/MessageBoxes/Contact';
import Chat from '../components/MessageBoxes/Chat';
import SearchBar from '../components/MessageBoxes/SearchBar';
import { ChatState } from '../context/ChatProvider';
import { getAuth } from 'firebase/auth';

const Messages = () => {
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const { user, setSelectedChat, chats, setChats } = ChatState();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const handleSearch = async (searchInput) => {
        if (!searchInput) {
            setSearchResults([]);
            return;
        }
        
        setLoading(true);
    
        try {
            const auth = getAuth();
            const token = await auth.currentUser.getIdToken(true);
    
            const response = await fetch(`/api/users?search=${encodeURIComponent(searchInput)}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
            });
    
            if (!response.ok) {
                const responseText = await response.text();
                console.error('Error response:', responseText);
                throw new Error(`HTTP error! status: ${response.status}, response: ${responseText}`);
            }
    
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error('Error fetching user data:', error);
            alert('An error occurred while fetching user data: ' + error.message);
        } finally {
            setLoading(false);
        }
    };
    const accessChat = async (userId) => {
        try {
            setLoadingChat(true);
            const auth = getAuth();
            const token = await auth.currentUser.getIdToken(true);

            const response = await fetch('/api/chats', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            const chatData = await response.json();
            
            if (!chats.find((c) => c._id === chatData._id)) {
                setChats([chatData, ...chats]);
            }
            
            setSelectedChat(chatData);
            console.log('Chat accessed or created successfully:', chatData);
        } catch (error) {
            console.error('Error accessing chat:', error);
            alert('Error accessing the chat: ' + error.message);
        } finally {
            setLoadingChat(false);
        }
    };

    return (
        <div>
            <NavBarPost />
            <div className="contacts-container">
                <div className="self-contact">
                    <img src="/images/user.png" className="profile-picture" alt="Profile" />
                    <h3>{currentUser ? currentUser.displayName || currentUser.email : "Loading..."}</h3>
                </div>
                <div className="other-contact-containers">
                    <h3>Messages</h3>
                    <SearchBar onSearch={handleSearch} />
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        searchResults.map(user => (
                            <div className="searched-user" key={user._id}>
                                <h4>{user.User.Personal_info.Username || user.User.Personal_info.Email}</h4>
                                <button onClick={() => accessChat(user._id)} disabled={loadingChat}>
                                    {loadingChat ? 'Loading...' : 'Message'}
                                </button>
                            </div>
                        ))
                    )}
                    <Contact />
                </div>
            </div>
            <div className="messages-container">
                <div className="messages-header">
                    <img src="/images/user.png" className="profile-picture" alt="User" />
                    {currentUser ? currentUser.displayName || currentUser.email : "Loading..."}
                </div>
                <Chat />
            </div>
        </div>
    );
};

export default Messages;