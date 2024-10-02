import './Browse.css';
import NavBarPost from '../components/NavBarPost/NavBar'
import Profile from '../components/ProfileCard/Profile'

const Browse = () => {
    return (
        <div>
            <NavBarPost />
                <div className="page-header">
                    <div className="filter">
                        Sort By
                        <select className="filter-dropdown">
                            <option value="rating">Highest Rating</option>
                            <option value="alphabetical">Alphabetical</option>
                        </select>
                    </div>
                </div>
                <Profile />
        </div>
    )
}

export default Browse