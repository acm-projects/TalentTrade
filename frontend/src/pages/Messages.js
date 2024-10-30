import React, { useEffect, useState, useCallback, useRef } from "react";
import "./Messages.css";
import NavBarPost from "../components/NavBarPost/PostNavBar";
import Contact from "../components/MessageBoxes/Contact";
import Chat from "../components/MessageBoxes/Chat";
import { FaSearch } from 'react-icons/fa';
import { ChatState } from "../context/ChatProvider";
import { getAuth } from "firebase/auth";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
const TYPING_TIMEOUT = 2000;

const Messages = () => {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchLoading, setSearchLoading] = useState(false);
    const [initialLoading, setInitialLoading] = useState(true);
    const [currentUserMongoId, setCurrentUserMongoId] = useState(null);
    const [currentUserInfo, setCurrentUserInfo] = useState(null);
    const [chatPartner, setChatPartner] = useState(null);
    const [socket, setSocket] = useState(null);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const typingTimeoutRef = useRef(null);

    const { selectedChat, setSelectedChat, chats, setChats } = ChatState();
    const auth = getAuth();

    const makeAuthenticatedRequest = useCallback(async (endpoint, options = {}) => {
        const token = await auth.currentUser.getIdToken(true);
        const response = await fetch(`http://localhost:4000/api/${endpoint}`, {
            ...options,
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                ...options.headers
            }
        });
        if (!response.ok) throw new Error(`API request failed: ${response.statusText}`);
        return response.json();
    }, [auth]);

    const handleMarkAsRead = useCallback(async (chatId) => {
        if (!chatId || !currentUserMongoId) return;
        
        try {
            const updatedChat = await makeAuthenticatedRequest(`chats/${chatId}/read`, {
                method: 'POST'
            });
            
            setChats(prevChats => 
                prevChats.map(chat => 
                    chat._id === chatId ? { ...chat, readBy: updatedChat.readBy } : chat
                )
            );
        } catch (error) {
            console.error('Error marking chat as read:', error);
        }
    }, [makeAuthenticatedRequest, currentUserMongoId]);

    const fetchCurrentUserMongoId = useCallback(async () => {
        try {
            const userData = await makeAuthenticatedRequest('users/current');
            setCurrentUserMongoId(userData._id);
            setCurrentUserInfo(userData);
            setInitialLoading(false);
        } catch (error) {
            console.error('Error fetching user ID:', error);
            setInitialLoading(false);
        }
    }, [makeAuthenticatedRequest]);

    const processChat = useCallback((chat) => {
        if (!chat || !chat.users) return null;
        
        const otherUser = chat.users.find(u => u._id !== currentUserMongoId);
        const lastReadTime = chat.readBy?.find(read => read === currentUserMongoId);
        
        const isUnread = chat.latestMessage && (
            !lastReadTime ||
            new Date(chat.latestMessage.createdAt) > new Date(lastReadTime)
        );

        return {
            ...chat,
            otherUser,
            latestMessage: chat.latestMessage || null,
            displayName: otherUser?.User?.Personal_info?.Username || 
                        otherUser?.User?.Personal_info?.Email || 
                        "Unknown User",
            isUnread
        };
    }, [currentUserMongoId]);

    const fetchChats = useCallback(async () => {
        if (!currentUserMongoId) return;

        try {
            const chatsData = await makeAuthenticatedRequest('chats');
            const processedChats = chatsData
                .filter(chat => chat.users?.length > 1)
                .map(processChat)
                .filter(chat => chat.otherUser)
                .sort((a, b) => {
                    if (!a.latestMessage || !b.latestMessage) return 0;
                    return new Date(b.latestMessage.createdAt) - new Date(a.latestMessage.createdAt);
                });

            setChats(processedChats);
        } catch (error) {
            console.error("Chats fetch error:", error);
        }
    }, [currentUserMongoId, makeAuthenticatedRequest, processChat]);

    const handleSearch = useCallback(async () => {
        if (!search) {
            setSearchResults([]);
            setShowDropdown(false);
            return;
        }

        try {
            setSearchLoading(true);
            const results = await makeAuthenticatedRequest(`users?search=${search}`);
            setSearchResults(results);
            setShowDropdown(true);
        } catch (error) {
            console.error("Search error:", error);
            setSearchResults([]);
        } finally {
            setSearchLoading(false);
        }
    }, [search, makeAuthenticatedRequest]);

    const accessChat = useCallback(async (userId) => {
        try {
            const chatData = await makeAuthenticatedRequest('chats', {
                method: 'POST',
                body: JSON.stringify({ userId })
            });

            if (!chats.find((c) => c._id === chatData._id)) {
                setChats(prev => [processChat(chatData), ...prev]);
            }
            setSelectedChat(chatData);
            setShowDropdown(false);
        } catch (error) {
            console.error("Chat access error:", error);
        }
    }, [chats, makeAuthenticatedRequest, setChats, setSelectedChat, processChat]);

    const handleTyping = useCallback(() => {
        if (typingTimeoutRef.current) {
            clearTimeout(typingTimeoutRef.current);
        }

        socket?.emit('typing', selectedChat._id);
        setIsTyping(true);

        typingTimeoutRef.current = setTimeout(() => {
            socket?.emit('stop typing', selectedChat._id);
            setIsTyping(false);
        }, TYPING_TIMEOUT);
    }, [socket, selectedChat]);

    const handleMessageReceived = useCallback((newMessage) => {
        if (selectedChat?._id === newMessage.chat._id) {
            setChats(prevChats => 
                prevChats.map(chat =>
                    chat._id === newMessage.chat._id
                        ? {
                            ...chat,
                            messages: chat.messages ? [...chat.messages, newMessage] : [newMessage],
                            latestMessage: newMessage,
                            readBy: chat.readBy?.filter(id => id !== currentUserMongoId) || []
                        }
                        : chat
                )
            );
        } else {
            setChats(prevChats =>
                prevChats.map(chat =>
                    chat._id === newMessage.chat._id
                        ? {
                            ...chat,
                            latestMessage: newMessage,
                            readBy: chat.readBy?.filter(id => id !== currentUserMongoId) || []
                        }
                        : chat
                )
            );
        }
    }, [selectedChat, currentUserMongoId]);

    useEffect(() => {
        if (!currentUserMongoId) return;

        const newSocket = io(ENDPOINT);
        setSocket(newSocket);
        newSocket.emit("setup", currentUserMongoId);

        newSocket.on("message received", handleMessageReceived);
        newSocket.on('typing', () => setIsTyping(true));
        newSocket.on('stop typing', () => setIsTyping(false));

        return () => newSocket.disconnect();
    }, [currentUserMongoId, handleMessageReceived]);

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            if (user) fetchCurrentUserMongoId();
        });
        return () => unsubscribe();
    }, [fetchCurrentUserMongoId]);

    useEffect(() => {
        if (currentUserMongoId) fetchChats();
    }, [currentUserMongoId, fetchChats]);

    useEffect(() => {
        if (selectedChat && currentUserMongoId) {
            handleMarkAsRead(selectedChat._id);
            setChatPartner(selectedChat.users.find(u => u._id !== currentUserMongoId));
        }
    }, [selectedChat, currentUserMongoId, handleMarkAsRead]);

    const getChatPartnerName = useCallback(() => 
        chatPartner?.User?.Personal_info?.Username || 
        chatPartner?.User?.Personal_info?.Email,
    [chatPartner]);

    const getCurrentUserName = useCallback(() => {
        if (initialLoading) {
            return "Loading...";
        }
        return currentUserInfo?.username || "No username set";
    }, [currentUserInfo, initialLoading]);

    return (
        <div>
            <NavBarPost />
            <div className="contacts-container">
                <div className="self-contact">
                    <img src="/images/user.png" className="profile-picture" alt="Profile" />
                    <h3>{getCurrentUserName()}</h3>
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
                        {!searchLoading && showDropdown && (
                            <div className="search-results-dropdown">
                                {searchResults.map((user) => (
                                    <div 
                                        className="searched-user" 
                                        key={user._id} 
                                        onClick={() => accessChat(user._id)}
                                    >
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
                            isSelected={selectedChat?._id === chat._id}
                            onClick={() => {
                                setSelectedChat(chat);
                                handleMarkAsRead(chat._id);
                            }}
                            currentUserId={currentUserMongoId}
                        />
                    ))}
                </div>
            </div>
            <div className="messages-container">
                <div className="messages-header">
                    <img src="/images/user.png" className="profile-picture" alt="User" />
                    {getChatPartnerName()}
                    {isTyping && <span className="typing-indicator">Typing...</span>}
                </div>
                <Chat 
                    socket={socket} 
                    isTyping={isTyping} 
                    onTyping={handleTyping}
                    selectedChat={selectedChat}
                />
            </div>
        </div>
    );
};

export default Messages;