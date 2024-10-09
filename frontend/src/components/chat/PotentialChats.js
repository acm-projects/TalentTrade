import { useContext } from "react"
import { ChatContext } from "../../contexts/ChatContext"

const PotentialChats = () => {
    const {potentialChats} = useContext(ChatContext);
    console.log("Potential Chats", potentialChats);
    return (<>start chat</>)
}

export default PotentialChats;