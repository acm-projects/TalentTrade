//import { useEffect } from 'react'
import NavBar from '../../components/NavBarPost/NavBar';
import ProfileDetails from "../../components/userDetails/profileDetails"
import TeachingCard from "../../components/userDetails/teachingCard"
import './profile.css'

const Profile = () => {
    const user = {
        Fname: "Cheryl",
        Lname: "Wang",
        location: "The University of Texas at Dallas",
        year: "Freshman",
        aboutMe: "Hi, I'm Larry! I'm passionate about exploring new ideas and always eager to learn something new. Whether it's diving into tech, working on creative projects, or connecting with others, I enjoy staying curious and open-minded. In my free time, I love hiking, reading, and experimenting with new recipes. Always up for a good conversation or a new challenge!",
        profilePicture: "./images/user.png",
        profileBanner: "./images/bottomBackground.png"
    }

    const teaching_skill1 = {
        Name: "Guitar",
        Description: "learning for 4 years",
        Rating_score: 4.6,
        Hours_taught:7
    }
    const teaching_skill2 = {
        Name: "Cooking",
        Description: "learning for 4 years  hjh gkjhg kjh gjh gjkh gkg kjhgkjh gjhg jh kjh gjh gkjhgkjhg jhg jhg kjh  djhf ksjdh lkjds hskdjfh lksjd sdjkhf ksjd hfkjsd fkjsdh kfjhsdfjsld kfjhsdkj fskf",
        Rating_score: 4.6,
        Hours_taught:7
    }

    const learning_skill = {
        Name: "programming"
    }

    //unfinished
    //useEffect(() => {
        //idk what it's supposed to fetch?
        //const fetchData = async fetch('/api/user')
        //const json = await response.json()

        //if (response.ok) {
            
        //}
    //})

    return (
        <div>
            <NavBar/>
            <div>
                <ProfileDetails user = {user}/>
            </div>
            <div>
                <h2 className='profileSkillHeader '>Teaching</h2>
                <div className='container'>
                    <TeachingCard teaching_skill = {teaching_skill1} />
                    <TeachingCard teaching_skill = {teaching_skill2} />
                    <TeachingCard teaching_skill = {teaching_skill1} />
                </div>
            </div>
            <div>
            <h2 className='profileSkillHeader '>Learning</h2>
                <div className='container'>
                    <div className='teachingCard border center'> 
                        <h5> {learning_skill.Name} </h5>
                    </div>
                </div>
            </div>
        
        </div>
    )
}

export default Profile