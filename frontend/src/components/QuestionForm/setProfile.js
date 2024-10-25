import { useState } from "react"

const SetProfile = (email) => {

    const [values, setValues] = useState({
        Fname: "",
        Lname: "",
        year: "",
        location: "",
        aboutMe: "",
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
        console.log(email.email)

        const response = await fetch('http://localhost:4000/api/users/' + email.email, {
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
            }, 850)

            //dispatch({type: 'SET_USER', payload: json})

            console.log("new data added, json")
            console.log(json)
        }

    }

    return(
        <div className="profileContainer c">
                <form className='form c' onSubmit={handleSubmit}>
                    <div className="double-input-row">
                        <label className="edit-label" htmlFor="firstName" draggable="false">First Name</label>
                        <label className="edit-label" htmlFor="lastName" draggable="false">Last Name</label>

                        <input className="edit-input" type="text" value={values.Fname} name="Fname"
                        onChange={(e) => handleChange(e)}/>
                        <input className="edit-input" type="text" value={values.Lname} name="Lname"
                        onChange={(e) => handleChange(e)}/>
                    </div>
                        <label className="edit-label" htmlFor="location" draggable="false">University</label>
                        <input className="edit-input" type="text" value={values.location} name="location"
                         onChange={(e) => handleChange(e)}/>

                        <label className="edit-label" htmlFor="year" draggable="false">Year</label>

                        
                        <input className="edit-input" type="text" value={values.year} name="year"
                        onChange={(e) => handleChange(e)}/>

                    <label className="edit-label" htmlFor="aboutMe" draggable="false">About Me</label>
                    <textarea className="edit-resize" name="aboutMe" id="aboutMe" cols="30" rows="" value={values.aboutMe}
                    onChange={(e) => handleChange(e)}></textarea>
                    
                    <div className="container c">
                     <button type='submit' className='addSkillButton hoverEnlarge2 c' draggable="false">Update</button>
                        {formSubmitted && <span className="form-submitted c" draggable="false">Sucessfully Updated!</span>}
                    </div>
                </form>
        </div>
    )
}

export default SetProfile