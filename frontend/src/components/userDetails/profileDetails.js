import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const ProfileDetails = ({ user }) => {
    //console.log(user)
    return (
        <div>
            <div className='border c'>
                <img src={"/images/background.png"} className='bannerPicture c'/>
                <div className='top c'> 
                    <div className='topleft c'>
                        <img src={"/images/user.svg"} className='profile-picture-l'/>
                        <div className='profileText c'>
                            <p className='profileTextHeader c'>{user.Fname} {user.Lname}</p>
                            <p className='pc'>{user.location}</p>
                            <p className='pc'>{user.year}</p>
                        </div>
                    </div>
                    <div className='topright c'>
                        <Link to="/profile/edit" className="edit c">
                            Edit
                        </Link>
                    </div>
                </div>
                
            </div>
            <div className='border aboutMe c'>
                <p className='h2c profileTextHeader c'>About Me</p>
                <p className="pc">{user.aboutMe}</p>
            </div>
        </div>
    )
}

export default ProfileDetails