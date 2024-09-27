import { useState } from "react"
import { useUserContext } from "../hooks/useUserContext"

const EditProfileForm = ( {user} ) => {
    const {dispatch} = useUserContext()

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

    const [formSubmitted, setFormSubmitted] = useState(false)

    const handleChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(values)

        const user = {values}

        const response = await fetch('/api/users/${user._id}', {
            method: 'PATCH',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const json = await response.json()
        
        if (response.ok){
            //sucess message
            setFormSubmitted(true)
            setTimeout(() => {
               setFormSubmitted(false)
            }, 3000)

            dispatch({type: 'CREATE_WORKOUT', payload: json})

            console.log("new data added, json")
        }

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
                <input type="text" value={values.Fname} name="Fname"
                onChange={(e) => handleChange(e)}/>

                <label htmlFor="lastName">Last Name</label>
                <input type="text" value={values.Lname} name="Lname"
                onChange={(e) => handleChange(e)}/>

                <label htmlFor="email">Email</label>
                <input type="email" value={values.Email} name="Email"
                onChange={(e) => handleChange(e)}/>

                <label htmlFor="location">Location</label>
                <input type="text" value={values.location} name="location"
                onChange={(e) => handleChange(e)}/>

                <label htmlFor="year">Year</label>
                <input type="text" value={values.year} name="year"
                onChange={(e) => handleChange(e)}/>

                <label htmlFor="aboutMe">About Me</label>
                <textarea name="aboutMe" id="aboutMe" cols='30' rows="" value={values.aboutMe}
                onChange={(e) => handleChange(e)}></textarea>
                
                <button type='submit' className='submitButton'>Update </button>
                {formSubmitted && <span className="formSubmitted">Sucessfully Updated!</span>}
            </form>
        </div>
    )
}

export default EditProfileForm