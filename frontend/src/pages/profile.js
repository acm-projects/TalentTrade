import { useEffect } from 'react'
import NavBar from '../components/PostNavBar';
import ProfileDetails from "../components/userDetails/profileDetails"
import TeachingCard from "../components/userDetails/teachingCard"
import './cheryl.css'
import { useUserContext } from '../hooks/useUserContext';

const Profile = () => {
    
    const {userData, dispatch} = useUserContext()

    //get profileschema data?
    useEffect(() => {
        const fetchUser = async () => {
            const response = await fetch('/api/user')
            const json = await response.json()

            //check if response is ok
            if (response.ok) {
                dispatch({type: 'SET_USER', payload: json})
            }
        }

        fetchUser()
    }, [dispatch])  

    //access personal info data
    let userInfo, teachingSkills, learningSkills;

    if (userData && userData.User && userData.User.Personal_info) {
        userInfo = userData.User.Personal_info;
    }

    if (userData && userData.User && userData.User.Skills) {
        teachingSkill = userData.User.Skills.teaching_skill;
        learningSkill = userData.User.Skills.learning_skill;
    }

    return (
        <div>
            <NavBar/>
            <div>
                <ProfileDetails user = {userInfo}/>
            </div>
            <div>
                <h2 className='profileSkillHeader '>Teaching</h2>
                <div className='container'>

                {teachingSkills.length > 0 ? (
                    teachingSkills.map((skill) => (
                        <TeachingCard key={skill._id} teaching_skill={skill} />
                    ))
                ) : (
                    <p>No teaching skills available</p>
                )}


                </div>
            </div>
            <div>
            <h2 className='profileSkillHeader '>Learning</h2>
                <div className='container'>

                    {learningSkills.length > 0 ? (
                        learningSkills.map((skill) => (
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