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
        <div className="container c">
            <form className='form c' onSubmit={handleSubmit}>
                <label className="c" htmlFor="profilePicture">Profile Picture</label>
                <input className="c" type="file" name="profilePicture"
                onChange={(e) => handleChange(e)}/>

                <label className="c" htmlFor="profileBanner">Banner Picture</label>
                <input className="c" type="file" name="profileBanner"
                onChange={(e) => handleChange(e)}/>
                
                <label className="c" htmlFor="firstName">First Name</label>
                <input className="c" type="text" value={values.Fname} name="Fname"
                onChange={(e) => handleChange(e)}/>

                <label className="c" htmlFor="lastName">Last Name</label>
                <input className="c" type="text" value={values.Lname} name="Lname"
                onChange={(e) => handleChange(e)}/>

                <label className="c" htmlFor="email">Email</label>
                <input className="c" type="email" value={values.Email} name="Email"
                onChange={(e) => handleChange(e)}/>

                <label className="c" htmlFor="location">Location</label>
                <input className="c" type="text" value={values.location} name="location"
                onChange={(e) => handleChange(e)}/>

                <label className="c" htmlFor="year">Year</label>
                <input className="c" type="text" value={values.year} name="year"
                onChange={(e) => handleChange(e)}/>

                <label className="c" htmlFor="aboutMe">About Me</label>
                <textarea className="c" name="aboutMe" id="aboutMe" cols='30' rows="" value={values.aboutMe}
                onChange={(e) => handleChange(e)}></textarea>
                
                <button type='submit' className='submitButton c'>Update </button>
                {formSubmitted && <span className="formSubmitted c">Sucessfully Updated!</span>}
            </form>
        </div>
    )
}

export default EditProfileForm