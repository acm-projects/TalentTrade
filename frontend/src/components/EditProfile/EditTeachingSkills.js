import { useState } from "react"
//import { useSkillContext } from '../../hooks/useLearningSkillContext';

const EditTeachingSkills = ({skills, email}) => {
    //const { dispatch } = useSkillContext();

    const [values, setValues] = useState({
        Name: '',
        Description: '',
        Rating_score: 0,
        Hours_taught: 0,
    })

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(values)

        const User = {
            User: {
                Skills: {
                    teaching_skills: [
                        ...(skills || []),
                        {
                            Name: values.Name,        
                            Description: values.Description,
                            Rating_score: 0,
                            Hours_taught: 0,   
                        }                
                    ]
                }
            }
        }
        console.log(User)
        const response = await fetch('http://localhost:4000/api/users/' + email, {
            method: 'PATCH',
            body: JSON.stringify(User),
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

            //dispatch({type: 'CREATE_SKILL', payload: json})

            console.log("new data added, json")
            console.log(json)
        }
    }

    return (
        <div>
             <div className="container">
                <form className='form' onSubmit={handleSubmit}>                    
                    <label htmlFor="Name">Skill Name</label>
                    <input className="c" type="text" placeholder='enter skill' name="Name"
                    onChange={(e) => handleChange(e)}/>

                    <label htmlFor="Description">Description</label>
                    <input className="c" type="text" placeholder="enter description" name="Description"
                    onChange={(e) => handleChange(e)}/>
                    
                    <button type='submit' className='submitButton'>Add </button>
                    {formSubmitted && <span className="formSubmitted">Sucessfully Added!</span>}
                </form>
            </div>
        </div>
    )
}

export default EditTeachingSkills