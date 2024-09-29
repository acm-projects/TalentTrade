import './Messages.css';
import NavBarPost from '../components/PostNavBar'
import Contacts from '../components/MessageBoxes/Contacts'

const Messages = () => {
    return (
        <div>
            <NavBarPost />
                <div className="contacts-container">
                    <h1>Hello</h1>
                </div>
                <div className="messages-container">
                    <h1>Hello</h1>
                </div>
        </div>
    )
}

export default Messages