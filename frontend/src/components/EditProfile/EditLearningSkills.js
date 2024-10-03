import { useState } from "react"

const EditLearningSkills = ({userInfo, email}) => {

    const [values, setValues] = useState({
        Name: '',
    })

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        setValues({[e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(values)

        const User = {
            User: {
                Skills: {
                    learning_skills: [
                        ...(userInfo || []),
                        
                            values
                        ,
                        
                    ]
                }
            }
        }

        console.log(User)

        const response = await fetch('http://localhost:4000/api/users/' + email, {
            method: 'PATCH',
            body: JSON.stringify({
                User
            }),
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

            //dispatch({type: 'SET_USER', payload: json})

            console.log("new data added, json")
            console.log(json)
        }
    }

    return (
        <div>
             <div className="container">
                <form className='form' onSubmit={handleSubmit}>                    
                    <label htmlFor="Name">Skill Name</label>
                    <input type="text" placeholder='enter skill' name="Name"
                    onChange={(e) => handleChange(e)}/>
                    
                    <button type='submit' className='submitButton'>Add </button>
                    {formSubmitted && <span className="formSubmitted">Sucessfully Added!</span>}
                </form>
            </div>
        </div>
    )
}

export default EditLearningSkills