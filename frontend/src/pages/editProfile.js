import NavBar from '../components/PostNavBar';
import EditProfileForm from '../components/EditProfile/EditProfileForm'
import EditTeachingSkills from '../components/EditProfile/EditTeachingSkills';
import EditLearningSkills from '../components/EditProfile/EditLearningSkills'
import './cheryl.css'
import { useEffect, useState } from 'react'
import { getAuth } from "firebase/auth";

const EditProfile = () => {

    const [profile, setProfile] = useState(null);
    const auth = getAuth();
    const user = auth.currentUser;

    //get profileschema data?
    useEffect(() => {
        if (user) {
            const fetchUser = async () => {
                const response = await fetch('/api/user/' + user.uid)
                const json = await response.json()

                //check if response is ok
                if (response.ok) {
                    setProfile(json)
                }
            }
            fetchUser()
        }
    }, [user])  

    
    return (
        <div>
            <NavBar/>
            <h1 className='margin0px'>Edit Profile</h1>
            <EditProfileForm user = { profile.Personal_info }/>
            <h1 className='margin0px'>Edit Skills</h1>
            <h2 className='profileSkillHeader alignLeft marginLeft15'>Teaching</h2>
            <EditTeachingSkills teachingSkill = { profile.Skills.teaching_skills }/>
            <h2 className='profileSkillHeader alignLeft marginLeft15'>Learning</h2>
            <EditLearningSkills learningSkill = { profile.Skills.learning_skills}/>
        </div>
    )
}

export default EditProfile