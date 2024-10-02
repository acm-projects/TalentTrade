import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const ProfileDetails = ({ user }) => {
    //console.log(user)
    return (
        <div>
            <div className='border'>
                <img src={"/images/background.png"} className='bannerPicture'/>
                <div className='top'> 
                    <div className='topleft'>
                        <img src={"/images/user.png"} className='pfp'/>
                        <div className='profileText'>
                            <p className='profileTextHeader c'>{user.Fname} {user.Lname}</p>
                            <p className='pc'>{user.location}</p>
                            <p className='pc'>{user.year}</p>
                        </div>
                    </div>
                    <div className='topright'>
                        <Link to="/profile/edit" className="edit">
                            Edit
                        </Link>
                    </div>
                </div>
                
            </div>
            <div className='border aboutMe'>
                <p className='h2c profileTextHeader'>About Me</p>
                <p className="pc">{user.aboutMe}</p>
            </div>
        </div>
    )
}

export default ProfileDetails