import { useEffect, useState } from 'react'
import { getAuth } from "firebase/auth";
import { auth } from '../components/Form/firebaseauth';
import NavBar from '../components/PostNavBar';
import ProfileDetails from "../components/userDetails/profileDetails"
import TeachingCard from "../components/userDetails/teachingCard"
import './cheryl.css'

const Profile = () => {
    
    const [profile, setProfile] = useState(null);
    const user = auth.currentUser;

    useEffect(() => {
        if (user) {
            const fetchUser = async () => {
                console.log(user.email)
                const response = await fetch('http://localhost:4000/api/users/' + encodeURIComponent(user.email))
                const json = await response.json()
                console.log(json)

                //check if response is ok
                if (response.ok) {
                    setProfile(json)
                }
            }
            fetchUser()
        }
    }, [user])  

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    return (
        <div>
            <NavBar/>
            <div>
                <ProfileDetails user = {profile.Personal_info}/>
            </div>
            <div>
                <h2 className='profileSkillHeader c'>Teaching</h2>
                <div className='container'>

                {profile.Skills?.teaching_skill?.length > 0 ? (
                    profile.Skills.teaching_skill.map((skill) => (
                        <TeachingCard key={skill._id} teaching_skill={skill} />
                    ))
                ) : (
                    <p>No teaching skills available</p>
                )}


                </div>
            </div>
            <div>
            <h2 className='profileSkillHeader c'>Learning</h2>
                <div className='container'>

                    {profile.Skills?.learning_skill?.length > 0 ? (
                        profile.Skills.learning_skill.map((skill) => (
                            <div className='teachingCard border center' key={skill._id}>
                                <h5>{skill.Name}</h5>
                            </div>
                        ))
                    ) : (
                        <p>No learning skills available</p>
                    )}


                </div>
            </div>
        
        </div>
    )
}

export default Profile