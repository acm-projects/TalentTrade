import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const ProfileDetails = ({ user }) => {
    return (
        <div>
            <div className='border'>
                <img src={user.profileBanner} className='bannerPicture'/>
                <div className='top'> 
                    <div className='topleft'>
                        <img src={user.profilePicture} className='pfp'/>
                        <div className='profileText'>
                            <h2 className='profileTextHeader'>{user.name}</h2>
                            <p>{user.location}</p>
                            <p>{user.year}</p>
                        </div>
                    </div>
                    <div className='topright'>
                        <Link to="/profile/edit" class="edit">
                            Edit
                        </Link>
                    </div>
                </div>
                
            </div>
            <div className='border aboutMe'>
                <h2 className='profileTextHeader'>About Me</h2>
                <p>{user.aboutMe}</p>
            </div>
        </div>
    )
}

export default ProfileDetails