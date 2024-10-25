import { useState } from "react"
import "../QuestionForm/editProfile.css"

const EditProfileForm = ( {user} ) => {

    const [values, setValues] = useState({
        Fname: user.Fname,
        Lname: user.Lname,
        Email: user.Email,
        year: user.year,
        location: user.location,
        aboutMe: user.aboutMe,
        profilePicture: user.profilePicture,
        profileBanner: user.profileBanner,
    })

    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(values)

        const User = {
                User: {
                    Personal_info: values
                }
            }
        
        console.log(User)

        const response = await fetch('http://localhost:4000/api/users/' + user.Email, {
            method: 'PATCH',
            body: JSON.stringify(User),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        
        if (response.ok){
            setFormSubmitted(true)
            setTimeout(() => {
               setFormSubmitted(false)
            }, 3000)

            //dispatch({type: 'SET_USER', payload: json})

            console.log("new data added, json")
            console.log(json)
        }

    }

    

    return (
        <div className="edit-container">
            <div className="edit-container-left">
                <form className='form c' onSubmit={handleSubmit}>
                    <div className="preview-card">
                        <div className="preview-banner">
                            <img src={"/images/defaultBanner.svg"} alt="banner" className="preview-banner" draggable="false"/>
                            </div>
                        <div className="preview-profile-picture"><img src={"/images/user.svg"} alt="profile" className="preview-profile-picture" draggable="false"/></div>
                        <input className="edit-upload-profile" type="file" name="profilePicture"
                        onChange={(e) => handleChange(e)}/>

                        <input className="edit-upload-banner" type="file" name="profileBanner"
                        onChange={(e) => handleChange(e)}/>
                    </div>
                </form>
            </div>
            <div className="edit-container-right">
                <form className='form c' onSubmit={handleSubmit}>
                    <div className="double-input-row">
                        <label className="edit-label" htmlFor="firstName" draggable="false">First Name</label>
                        <label className="edit-label" htmlFor="lastName" draggable="false">Last Name</label>

                        <input className="edit-input" type="text" value={values.Fname} name="Fname"
                        onChange={(e) => handleChange(e)}/>
                        <input className="edit-input" type="text" value={values.Lname} name="Lname"
                        onChange={(e) => handleChange(e)}/>
                    </div>

                    <label className="edit-label" htmlFor="email" draggable="false">Email</label>
                    <input className="edit-input" type="email" value={values.Email} name="Email"
                    onChange={(e) => handleChange(e)}/>

                    <label className="edit-label" htmlFor="location" draggable="false">University</label>
                    <input className="edit-input" type="text" value={values.location} name="location"
                    onChange={(e) => handleChange(e)}/>

                    <label className="edit-label" htmlFor="year" draggable="false">Year</label>
                    <input className="edit-input" type="text" value={values.year} name="year"
                    onChange={(e) => handleChange(e)}/>

                    <label className="edit-label" htmlFor="aboutMe" draggable="false">About Me</label>
                    <textarea className="edit-resize" name="aboutMe" id="aboutMe" cols="30" rows="" value={values.aboutMe}
                    onChange={(e) => handleChange(e)}></textarea>
                    
                    <button type='submit' className='edit-submit' draggable="false">Update</button>
                    {formSubmitted && <span className="form-submitted" draggable="false">Sucessfully Updated!</span>}
                </form>
            </div>
        </div>
    )
}

export default EditProfileForm