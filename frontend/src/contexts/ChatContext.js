import { createContext, useState, useEffect } from 'react';
import { baseUrl, getRequest } from "../utils/services";

export const ChatContext = createContext();

export const ChatContextProvider = ({ children, user }) => {
    const [userChats, setUserChats] = useState(null);
    const [isUserChatsLoading, setIsUserChatsLoading] = useState(false);
    const [userChatsError, setUserChatsError] = useState(null);
    const [potentialChats, setPotentialChats] = useState([]);

    useEffect(() => {

        const getUsers = async() => {
            const response = await getRequest(`${baseUrl}/users`);
    
            if (response.error) {
                return console.log("Error fetching users:", response);
            }

            const pChats = response.filter((u) => {
                let isChatCreated = false;

                if (user._id === u._id) return false

                if(userChats){
                    isChatCreated = userChats?.some((chat) => {
                        return chat.members[0] === u._id || chat.members[1] === u._id;
                    })
                }

                return !isChatCreated;

            });
            setPotentialChats(pChats);
        };

        getUsers();
    }, [userChats])

    useEffect(() => {
        const getUserChats = async () => {
            if (user?.email) {
                setIsUserChatsLoading(true);
                setUserChatsError(null);
    
                const response = await getRequest(`${baseUrl}/chats?email=${encodeURIComponent(user.email)}`)
    
                setIsUserChatsLoading(false);
    
                if (response.error) {
                    return console.log("Error fetching user chats:", response);
                }
    
                const filteredChats = response.filter((chat) => {
                    return !chat.members.includes(user.email);
                });
    
                setUserChats(filteredChats); 
                console.log("UserChats:", filteredChats);
            }
        };
    
        getUserChats();
    }, [user]);
    
    return (
        <ChatContext.Provider 
        value={{
            userChats,
            isUserChatsLoading,
            userChatsError,
            potentialChats,
        }}
        >
            {children}
        </ChatContext.Provider>
    );
};
