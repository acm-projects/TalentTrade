import React, { useEffect, useState, useCallback } from "react";
import "./Messages.css";
import NavBarPost from "../components/NavBarPost/PostNavBar";
import Contact from "../components/MessageBoxes/Contact";
import Chat from "../components/MessageBoxes/Chat";
import { FaSearch } from 'react-icons/fa';
import { ChatState } from "../context/ChatProvider";
import { getAuth } from "firebase/auth";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

const Messages = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [currentUserMongoId, setCurrentUserMongoId] = useState(null);
    const [chatPartner, setChatPartner] = useState(null);
    const [socketConnected, setSocketConnected] = useState(false);
    const [socket, setSocket] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [newChatTrigger, setNewChatTrigger] = useState(0);

    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();


    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
                fetchCurrentUserMongoId(user);
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (currentUserMongoId) {
            setupSocket();
            fetchChats();
        }
    }, [currentUserMongoId, newChatTrigger]);

    useEffect(() => {
        if (selectedChat && currentUserMongoId) {
            const partner = selectedChat.users.find(u => u._id !== currentUserMongoId);
            setChatPartner(partner);
        }
    }, [selectedChat, currentUserMongoId]);

    const setupSocket = () => {
        const newSocket = io(ENDPOINT);
        newSocket.on("connect", () => setSocketConnected(true));
        newSocket.on("disconnect", () => setSocketConnected(false));
        newSocket.emit("setup", currentUserMongoId);
        setSocket(newSocket);

        return () => newSocket.disconnect();
    };

    const fetchCurrentUserMongoId = async (user) => {
        try {
            const token = await user.getIdToken(true);
            const response = await fetch('http://localhost:4000/api/users/current', {
                method: 'GET',
                headers: { "Authorization": `Bearer ${token}` },
            });

            if (!response.ok) throw new Error('Failed to fetch current user info');

            const userData = await response.json();
            setCurrentUserMongoId(userData._id);
        } catch (error) {
            console.error('Error fetching current user MongoDB ID:', error);
        }
    };

    const handleSearch = useCallback(async () => {
        if (!search) {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }

        try {
            setLoading(true);
            const auth = getAuth();
            const token = await auth.currentUser.getIdToken(true);
            const response = await fetch(`http://localhost:4000/api/users?search=${search}`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            setSearchResults(data);
            setShowDropdown(true);
        } catch (error) {
            console.error("Error fetching user data:", error);
            setSearchResults([]);
        } finally {
            setLoading(false);
        }
    }, [search]);

    const accessChat = useCallback(async (userId) => {
        try {
            setLoadingChat(true);
            const auth = getAuth();
            const token = await auth.currentUser.getIdToken(true);
            const response = await fetch("http://localhost:4000/api/chats", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ userId }),
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const chatData = await response.json();

            if (!chats.find((c) => c._id === chatData._id)) {
                setChats(prevChats => [chatData, ...prevChats]);
            }

            setSelectedChat(chatData);
            setShowDropdown(false);
            setNewChatTrigger(prev => prev + 1);
        } catch (error) {
            console.error("Error accessing chat:", error);
            alert("Error accessing the chat: " + error.message);
        } finally {
            setLoadingChat(false);
        }
    }, [chats, setChats, setSelectedChat]);
    
    const fetchChats = useCallback(async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) throw new Error('User is not authenticated');
            
            const token = await user.getIdToken(true);
            const response = await fetch("http://localhost:4000/api/chats", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const chatsData = await response.json();
            console.log("Fetched chats data:", chatsData);

            const processedChats = chatsData
                .filter(chat => chat.users && chat.users.length > 1)
                .map(chat => {
                    const otherUser = chat.users.find(u => u._id !== currentUserMongoId);
                    console.log("Other user data:", otherUser);
                    return {
                        ...chat,
                        otherUser: otherUser,
                        displayName: otherUser?.User?.Personal_info?.Username || 
                                     otherUser?.User?.Personal_info?.Email || 
                                     "Unknown User"
                    };
                })
                .filter(chat => chat.otherUser);

            console.log("Processed chats:", processedChats);
            setChats(processedChats);
        } catch (error) {
            console.error("Error fetching chats:", error);
            alert("Error fetching chats: " + error.message);
        }
    }, [setChats, currentUserMongoId]);

    const getChatPartnerName = useCallback(() => {
        if (!chatPartner) return "Loading...";
        return chatPartner.User?.Personal_info?.Username || 
               chatPartner.User?.Personal_info?.Email || 
               "Chat Partner";
    }, [chatPartner]);

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
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyUp={handleSearch}
                            placeholder="Search by username or email"
                        />
                        {loading ? (
                            <div>Loading...</div>
                        ) : showDropdown && (
                            <div className="search-results-dropdown">
                                {searchResults.map((user) => (
                                    <div className="searched-user" key={user._id} onClick={() => accessChat(user._id)}>
                                        {user.User.Personal_info.Username || user.User.Personal_info.Email}
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                    {chats.map((chat) => (
                        <Contact 
                            key={chat._id} 
                            chat={chat} 
                            otherUser={chat.otherUser}
                            displayName={chat.displayName}
                            isSelected={selectedChat && selectedChat._id === chat._id}
                            onClick={() => setSelectedChat(chat)}
                        />
                    ))}
                </div>
            </div>
            <div className="messages-container">
                <div className="messages-header">
                    <img src="/images/user.png" className="profile-picture" alt="User" />
                    {getChatPartnerName()}
                </div>
                <Chat socket={socket} socketConnected={socketConnected} />
            </div>
        </div>
    );
};

export default Messages;