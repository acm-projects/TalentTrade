import './Messages.css';
import NavBarPost from '../components/NavBarPost/NavBar'
import Contact from '../components/MessageBoxes/Contact'

const Messages = () => {
    return (
        <div>
            <NavBarPost />
                <div className="contacts-container">
                    <div className="self-contact">
                        <img src={"/images/user.png"} class="profile-picture"/>
                        <h3>Name</h3>
                    </div>
                    <div className="other-contact-containers">
                        <h3>Messages</h3>
                        <Contact />
                    </div>
                </div>
                <div className="messages-container">
                    <div className="messages-header">
                        <img src={"/images/user.png"} class="profile-picture"/>
                        Steve Jones
                        </div>
                </div>
        </div>
    )
}

export default Messages