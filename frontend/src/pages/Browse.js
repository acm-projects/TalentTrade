import './Browse.css';
import NavBarPost from '../components/NavBarPost/NavBar'
import Profile from '../components/ProfileCard/Profile'

const Browse = () => {
    return (
        <div>
            <NavBarPost />
                <div className="page-header"></div>
                <Profile />
        </div>
    )
}

export default Browse