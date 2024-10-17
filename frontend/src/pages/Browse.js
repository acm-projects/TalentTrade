import './Browse.css';
import NavBarPost from '../components/NavBarPost/NavBar'
import Profile from '../components/ProfileCard/Profile'
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import '../components/ProfileCard/Profile.css'

const Browse = () => {
    //get current user's email
    // const [email, setEmail] = useState(null);
    // const auth = getAuth()

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
    //         if (currentUser) {
    //             setEmail(currentUser.email)
    //         } else {
    //             console.log("No user is signed in");
    //         }
    //     });
    //     return () => unsubscribe();
    // }, [auth]);

    //all users
    const [users, setUsers] = useState([])

    //get all users with search algorithm
    // useEffect( () => {
    //     const fetchUsers = async () => {
    //         const response = await fetch('http://localhost:4000/api/users/recommendations' + email, {
    //             method: 'POST',
    //             body: JSON.stringify(email),
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             }
    //         })
    //         const json = await response.json()
    //         setUsers(json)
    //     }
    //     fetchUsers();
    // }, [])

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
        <div className='animate__fadeIn animate__animated fade c'>
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