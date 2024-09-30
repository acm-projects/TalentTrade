import './Messages.css';
import NavBarPost from '../components/NavBarPost/NavBar'
import Contacts from '../components/MessageBoxes/Contacts'

const Messages = () => {
    return (
        <div>
            <NavBarPost />
                <div className="contacts-container">
                    <div className="self-contact">
                        <img src={"/images/user.png"} class="profile-picture"/>
                        <h3>Name</h3>
                        <div className="secondary-text">
                            email@email.com
                        </div>
                        <div className="other-contacts">
                            <h3>Messages</h3>
                        </div>
                    </div>
                </div>
                <div className="messages-container">
                    <div className="messages-header">
                        <img src={"/images/user.png"} class="profile-picture"/>
                        Name
                        </div>
                </div>
        </div>
    )
}

export default Messages