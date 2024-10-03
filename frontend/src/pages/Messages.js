import './Messages.css';
import NavBarPost from '../components/NavBarPost/NavBar'
import Contact from '../components/MessageBoxes/Contact'
import Chat from '../components/MessageBoxes/Chat'

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