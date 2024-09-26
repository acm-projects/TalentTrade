import NavBar from '../components/PostNavBar';
import EditProfileForm from '../components/EditProfile/EditProfileForm'
import EditTeachingSkills from '../components/EditProfile/EditTeachingSkills';
import './cheryl.css'
import EditLearningSkills from '../components/EditProfile/EditLearningSkills';

const EditProfile = () => {
    const user = {
        Fname: "Cheryl",
        Lname: "Wang",
        Email: "whxcollege@gmail.com",
        location: "The University of Texas at Dallas",
        year: "Freshman",
        aboutMe: "Hi, I'm cheryl! I'm passionate about exploring new ideas and always eager to learn something new. Whether it's diving into tech, working on creative projects, or connecting with others, I enjoy staying curious and open-minded. In my free time, I love hiking, reading, and experimenting with new recipes. Always up for a good conversation or a new challenge!",
        profilePicture: "./images/user.png",
        profileBanner: "./images/bottomBackground.png"
    }
    
    return (
        <div>
            <NavBar/>
            <h1 className='margin0px'>Edit Profile</h1>
            <EditProfileForm user = { user }/>
            <h1 className='margin0px'>Edit Skills</h1>
            <h2 className='profileSkillHeader alignLeft marginLeft15'>Teaching</h2>
            <EditTeachingSkills/>
            <h2 className='profileSkillHeader alignLeft marginLeft15'>Learning</h2>
            <EditLearningSkills/>
        </div>
    )
}

export default EditProfile