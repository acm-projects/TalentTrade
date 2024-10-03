import { useEffect, useState } from 'react'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import NavBar from '../components/PostNavBar';
import ProfileDetails from "../components/userDetails/profileDetails"
import TeachingCard from "../components/userDetails/teachingCard"
import './cheryl.css'

const Profile = () => {
    
    const [profile, setProfile] = useState(null);
    const [user, setUser] = useState(null);
    const [email, setEmail] = useState(null);
    const auth = getAuth()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            if (currentUser) {
                setUser(currentUser);
                setEmail(currentUser.email)
            } else {
                console.log("No user is signed in");
            }
        });
        return () => unsubscribe();
    }, [auth]);

    console.log(profile)

    useEffect(() => {
        if (email) {
            const fetchUser = async () => {
                try {
                    console.log('/api/users/' + email)
                    const response = await fetch('http://localhost:4000/api/users/' + encodeURIComponent(email));

                    console.log('Response status:', response.status);
                    console.log('Response content-type:', response.headers.get('content-type'));

                    if (response.ok) {
                        console.log(response)
                        const json = await response.json();
                        setProfile(json);
                    } else {
                        console.error("Failed to fetch user data");
                    }
                } catch (error) {
                    console.error("Error fetching user data:", error);
                }
            };
            fetchUser()
        }
    }, [email])  

    if (!profile) {
        return <p>Loading profile...</p>;
    }

    console.log(profile.User.Skills.teaching_skills)

    return (
        <div>
            <NavBar/>
            <div>
                <ProfileDetails user = {profile.User.Personal_info}/>
            </div>
            <div>
                <h2 className='profileSkillHeader c'>Teaching</h2>
                <div className='container'>

                {profile.User.Skills?.teaching_skills?.length > 0 ? (
                    profile.User.Skills.teaching_skills.map((skill) => (
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

                    {profile.User.Skills?.learning_skills?.length > 0 ? (
                        profile.User.Skills.learning_skills.map((skill) => (
                            <div className='teachingCard border center' key={skill._id}>
                                <p className='profileTextHeader c textCenter topBottomPadding'>{skill.Name}</p>
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