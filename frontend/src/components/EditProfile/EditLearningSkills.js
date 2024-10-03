import React, { useState, useContext, useEffect } from 'react';
//import { SkillContext } from "../../context/SkillContext";

const EditLearningSkills = ({skills, email}) => {

    //const { skill, dispatch } = useContext(SkillContext);
    
    // useEffect(() => {
    //     dispatch({type: 'SET_SKILLS', payload: learning_skills})
    // }, [dispatch, learning_skills]);

    const [values, setValues] = useState({
        Name: '',
        Description: ''
    })

    const [formSubmitted, setFormSubmitted] = useState(false);

    const handleChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        //console.log(values)

        console.log(skills)
        const User = {
            User: {
                Skills: {
                    learning_skills: [
                        ...(skills || []),
                        {
                            Name: values.Name,        
                            Description: values.Description        
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

            console.log(skills)

            console.log("new data added, json")
            console.log(json)
            //dispatch({ type: 'ADD_SKILL', payload: newSkill });


            //setValues({ Name: '', Description: '' });
        }
    }

    return (
        <div>
             <div className="container">
                <form className='form' onSubmit={handleSubmit}>                    
                    <label htmlFor="Name">Skill Name</label>
                    <input className="c" type="text" placeholder='enter skill' name="Name" required
                    onChange={(e) => handleChange(e)}/>

                    <label htmlFor="Description">Skill Description</label>
                    <input className="c" type="text" placeholder='enter description' name="Description" required
                    onChange={(e) => handleChange(e)}/>
                    
                    <button type='submit' className='submitButton'>Add </button>
                    {formSubmitted && <span className="formSubmitted">Sucessfully Added!</span>}
                </form>
            </div>
        </div>
    )
}

export default EditLearningSkills