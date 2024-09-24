import './Messages.css';
import NavBarPost from '../components/NavBarPost/NavBar'
import Contacts from '../components/MessageBoxes/Contacts'

const Messages = () => {
    return (
        <div>
            <NavBarPost />
            <div className="container">
                <div className="contacts-container">
                    <h1>Hello</h1>
                </div>
                <div className="messages-container">
                    <h1>Hello</h1>
                </div>
                
            </div>
        </div>
    )
}

export default Messages