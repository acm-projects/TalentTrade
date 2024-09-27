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
    if (userData && userData.User && userData.User.Personal_info) {
        const userInfo = userData.User.Personal_info;
    }

    //access teaching skills data
    if (userData && userData.User && userData.User.Skills && userData.User.Skills.teaching_skill) {
        const teachingSkill = userData.User.Skills.teaching_skill;
    }

    //access learning skills data
    if (userData && userData.User && userData.User.Skills && userData.User.Skills.learning_skill) {
        const learningSkill = userData.User.Skills.learning_skills;
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
                {teachingSkill && teachingSkill.map((skill)=> (
                    <TeachingCard key={skill._id} teaching_skill={skill}/>
                ))}
                </div>
            </div>
            <div>
            <h2 className='profileSkillHeader '>Learning</h2>
                <div className='container'>

                    {learningSkill && teachingSkill.map((skill) => (
                        <div className='teachingCard border center'> 
                            <h5> {learning_skill.Name} </h5>
                        </div>
                    ))}
                </div>
            </div>
        
        </div>
    )
}

export default Profile