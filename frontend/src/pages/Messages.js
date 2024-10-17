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

    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setCurrentUser(user);
                fetchCurrentUserMongoId();
            }
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        if (currentUserMongoId) {
            const newSocket = io(ENDPOINT);
            newSocket.on("connect", () => {
                console.log(`Socket connected with id: ${newSocket.id}`);
                setSocketConnected(true);
            });
            newSocket.on("disconnect", () => {
                console.log(`Socket disconnected: ${newSocket.id}`);
                setSocketConnected(false);
            });
            newSocket.emit("setup", currentUserMongoId);
            newSocket.on("connected", () => {
                console.log(`Socket setup completed for user: ${currentUserMongoId}`);
            });
            setSocket(newSocket);

            return () => {
                console.log(`Cleaning up socket connection: ${newSocket.id}`);
                newSocket.disconnect();
            };
        }
    }, [currentUserMongoId]);

    const fetchCurrentUserMongoId = async () => {
        try {
            const auth = getAuth();
            const user = auth.currentUser;
            if (!user) {
                throw new Error('User is not authenticated');
            }
            const token = await user.getIdToken(true);

            const response = await fetch('http://localhost:4000/api/users/current', {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch current user info');
            }

            const userData = await response.json();
            console.log(`Fetched current user MongoDB ID: ${userData._id}`);
            setCurrentUserMongoId(userData._id);
        } catch (error) {
            console.error('Error fetching current user MongoDB ID:', error);
        }
    };

    useEffect(() => {
        if (selectedChat && currentUserMongoId) {
            const partner = selectedChat.users.find(u => u._id !== currentUserMongoId);
            console.log(`Chat partner set: ${partner?.User?.Personal_info?.Username || partner?.User?.Personal_info?.Email}`);
            setChatPartner(partner);
        }
    }, [selectedChat, currentUserMongoId]);

    const handleSearch = useCallback(async () => {
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

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(
                    errorData.message || `HTTP error! status: ${response.status}`
                );
            }

            const chatData = await response.json();

            if (!chats.find((c) => c._id === chatData._id)) {
                setChats(prevChats => [chatData, ...prevChats]);
            }

            setSelectedChat(chatData);
            setLoadingChat(false);
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
            if (!user) {
                throw new Error('User is not authenticated');
            }
            const token = await user.getIdToken(true);

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
        } catch (error) {
            console.error("Error fetching chats:", error);
            alert("Error fetching chats: " + error.message);
        }
    }, [setChats]);

    useEffect(() => {
        const userInfo = localStorage.getItem("userInfo");
        if (userInfo) {
            const parsedUserInfo = JSON.parse(userInfo);
            setCurrentUser(parsedUserInfo);
            fetchChats();
        }
    }, [fetchChats]);

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
                    {getChatPartnerName()}
                </div>
                <Chat socket={socket} socketConnected={socketConnected} />
            </div>
        </div>
    );
};

export default Messages;