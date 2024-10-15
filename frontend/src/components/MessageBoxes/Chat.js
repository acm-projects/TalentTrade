import React, { useEffect, useState, useRef } from 'react';
import './Chat.css';
import { ChatState } from '../../context/ChatProvider';
import { getAuth } from 'firebase/auth';

function Chat() {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const [newMessage, setNewMessage] = useState('');
    const messagesEndRef = useRef(null);

    const { user, selectedChat } = ChatState();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const sendMessage = async (event) => {
        if (event.key === 'Enter' && newMessage) {
            try {
                const auth = getAuth();
                const token = await auth.currentUser.getIdToken(true);

                setNewMessage('');
                const response = await fetch('http://localhost:4000/api/messages', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                    body: JSON.stringify({ content: newMessage, chatId: selectedChat._id }),
                });

                if (!response.ok) {
                    throw new Error('Failed to send message');
                }

                const messageData = await response.json();
                setMessages(prevMessages => [...prevMessages, messageData]);
            } catch (error) {
                console.error('Error sending message:', error);
            }
        }
    };

    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            setLoading(true);
            const auth = getAuth();
            const token = await auth.currentUser.getIdToken(true);

            const response = await fetch(`http://localhost:4000/api/messages/${selectedChat._id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch messages');
            }

            const messagesData = await response.json();
            setMessages(messagesData);
        } catch (error) {
            console.error('Error fetching messages:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [selectedChat]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const isCurrentUserMessage = (message) => {
        return message.sender._id === user._id;
    };

    const getChatPartnerName = () => {
        if (!selectedChat || !selectedChat.users) return 'Chat';
        const chatPartner = selectedChat.users.find(u => u._id !== user._id);
        return chatPartner ? chatPartner.name : 'Chat';
    };

    if (loading) {
        return <div>Loading messages...</div>;
    }

    return (
        <div className="chat-container">
    <div className="chat-header">
        <h2>{getChatPartnerName()}</h2>
    </div>
    <div className="message-window">
        <div className="visible-messages">
            {messages.map((message, index) => (
                <div key={index} className={`message-row ${isCurrentUserMessage(message) ? "self-message-row" : "other-message-row"}`}>
                    <div className={`message-box ${isCurrentUserMessage(message) ? "self-message-box" : "other-message-box"}`}>
                        {message.content}
                    </div>
                </div>
            ))}
            <div ref={messagesEndRef} />
        </div>
    </div>
    <div className="chat-box">
        <input
            onKeyDown={sendMessage}
            type="text"
            id="text"
            placeholder="Message..."
            autoComplete="off"
            onChange={(e) => setNewMessage(e.target.value)}
            value={newMessage}
        />
    </div>
</div>
    );
}

export default Chat;