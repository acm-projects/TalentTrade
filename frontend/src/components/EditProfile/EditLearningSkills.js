import { useState } from "react"

const EditLearningSkills = () => {

    const [values, setValues] = useState({
        Name: '',
    })

    const handleChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(values)
    }

    return (
        <div>
             <div className="container">
                <form className='form' onSubmit={handleSubmit}>                    
                    <label htmlFor="Name">Skill Name</label>
                    <input type="text" placeholder='enter skill' name="Name"
                    onChange={(e) => handleChange(e)}/>
                    
                    <button type='submit' className='submitButton'>Add </button>
                </form>
            </div>
        </div>
    )
}

export default EditLearningSkills