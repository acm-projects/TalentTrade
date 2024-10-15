import React, { useEffect, useState } from "react";
import "./Messages.css";
import NavBarPost from "../components/NavBarPost/PostNavBar";
import Contact from "../components/MessageBoxes/Contact";
import Chat from "../components/MessageBoxes/Chat";
import { FaSearch } from 'react-icons/fa';
import { ChatState } from "../context/ChatProvider";
import { getAuth } from "firebase/auth";

const Messages = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingChat, setLoadingChat] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);

    const { setSelectedChat, chats, setChats } = ChatState();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const handleSearch = async () => {
        if (!search) {
            setSearchResults([]);
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
    
            if (!response.ok) {
                const errorData = await response.json();
                console.error("Error response:", errorData);
                throw new Error(
                    `HTTP error! status: ${response.status}, message: ${errorData.message || 'Unknown error'}`
                );
            }
    
            const data = await response.json();
            setSearchResults(data);
        } catch (error) {
            console.error("Error fetching user data:", error);
            alert("An error occurred while fetching user data: " + error.message);
        } finally {
            setLoading(false);
        }
    };
    
    
    
    const accessChat = async (userId) => {
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

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || `HTTP error! status: ${response.status}`
                );
            }

            const chatData = await response.json();

            if (!chats.find((c) => c._id === chatData._id)) {
                setChats([chatData, ...chats]);
            }

            setSelectedChat(chatData);
            setLoadingChat(false);
            console.log("Chat accessed or created successfully:", chatData);
        } catch (error) {
            console.error("Error accessing chat:", error);
            alert("Error accessing the chat: " + error.message);
        } finally {
            setLoadingChat(false);
        }
    };

    const fetchChats = async () => {
        setLoadingChat(true);
        try {
            const auth = getAuth();
            const token = await auth.currentUser.getIdToken(true);

            const response = await fetch("http://localhost:4000/api/chats", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || `HTTP error! status: ${response.status}`
                );
            }

            const chatsData = await response.json();
            setChats(chatsData);
            console.log("Chats fetched successfully:", chatsData);
        } catch (error) {
            console.error("Error fetching chats:", error);
            alert("Error fetching chats: " + error.message);
        }
        setLoadingChat(false);
    };

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            setCurrentUser(parsedUserInfo);
            fetchChats();
        }
    }, []);

    return (
        <div>
            <NavBarPost />
            <div className="contacts-container">
                <div className="self-contact">
                    <img
                        src="/images/user.png"
                        className="profile-picture"
                        alt="Profile"
                    />
                    <h3>
                        {currentUser
                            ? currentUser.displayName || currentUser.email
                            : "Loading..."}
                    </h3>
                </div>
                <div className="other-contact-containers">
                    <h3>Messages</h3>
                    <div className="search-bar">
                        <FaSearch className="search-icon" />
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by username or email"
                        />
                        <button
                            className="search-button"
                            onClick={handleSearch}
                        >
                            Search
                        </button>
                    </div>
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        searchResults.map((user) => (
                            <div className="searched-user" key={user._id}>
                                <h4>
                                    {user.User.Personal_info.Username ||
                                        user.User.Personal_info.Email}
                                </h4>
                                <button
                                    onClick={() => accessChat(user._id)}
                                    disabled={loadingChat}
                                >
                                    {loadingChat ? "Loading..." : "Message"}
                                </button>
                            </div>
                        ))
                    )}
                    <Contact />
                </div>
            </div>
            <div className="messages-container">
                <div className="messages-header">
                    <img
                        src="/images/user.png"
                        className="profile-picture"
                        alt="User"
                    />
                    {currentUser
                        ? currentUser.displayName || currentUser.email
                        : "Loading..."}
                </div>
                <Chat />
            </div>
        </div>
    );
};

export default Messages;