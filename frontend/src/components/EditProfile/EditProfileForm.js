import { useState } from "react"

const EditProfileForm = ( {user} ) => {

    const [values, setValues] = useState({
        Fname: user.Fname,
        Lname: user.Lname,
        Email: user.Email,
        year: user.year,
        location: user.location,
        aboutMe: user.aboutMe,
        profilePicture: user.profilePicture,
        profileBanner: user.profileBanner
    })

    const handleChange = (e) => {
        setValues({...values, [e.target.name]:[e.target.value]})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
    }

    return (
        <div className="container">
            <form className='form' onSubmit={handleSubmit}>
                <label htmlFor="profilePicture">Profile Picture</label>
                <input type="file" name="profilePicture"
                onChange={(e) => handleChange(e)}/>

                <label htmlFor="profileBanner">Banner Picture</label>
                <input type="file" name="profileBanner"
                onChange={(e) => handleChange(e)}/>
                
                <label htmlFor="firstName">First Name</label>
                <input type="text" placeholder={user.Fname} name="Fname"
                onChange={(e) => handleChange(e)}/>

                <label htmlFor="lastName">Last Name</label>
                <input type="text" placeholder={user.Lname} name="Lname"
                onChange={(e) => handleChange(e)}/>

                <label htmlFor="email">Email</label>
                <input type="email" placeholder={user.Email} name="Email"
                onChange={(e) => handleChange(e)}/>

                <label htmlFor="location">Location</label>
                <input type="text" placeholder={user.location} name="location"
                onChange={(e) => handleChange(e)}/>

                <label htmlFor="year">Year</label>
                <input type="text" placeholder={user.year} name="year"
                onChange={(e) => handleChange(e)}/>

                <label htmlFor="aboutMe">About Me</label>
                <textarea name="aboutMe" id="aboutMe" cols='30' rows="" placeholder={user.aboutMe}
                onChange={(e) => handleChange(e)}></textarea>
                
                <button type='submit' className='submitButton'>Update </button>
            </form>
        </div>
    )
}

export default EditProfileForm