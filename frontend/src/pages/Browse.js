import './Browse.css';
import NavBarPost from '../components/NavBarPost/NavBar'
import Profile from '../components/ProfileCard/Profile'
import { useState, useEffect } from 'react';
import '../components/ProfileCard/Profile.css'

const Browse = () => {

    //all users
    const [users, setUsers] = useState([])

    //get all users
    useEffect( () => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/users'); 
                const data = await response.json();
        
                setUsers(data);
              } 
            catch (error) {
                console.error('Error fetching users:', error);
            }
        }

        fetchUsers();
    }, [])

    console.log(users)


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
                <div className="profile-grid">
                    {users.map((user) => (
                        <Profile key={user._id} userData={user}/>
                    ))}
                </div>
        </div>
    )
}

export default Browse