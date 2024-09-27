import { useState } from "react"

const EditTeachingSkills = () => {

    const [values, setValues] = useState({
        Name: '',
        Description: '',
        Rating_score: 0,
        Hours_taught: 0,
    })

    const handleChange = (e) => {
        setValues({...values, [e.target.name]:e.target.value})
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        console.log(values)

        const teaching_skill = {values}

        const response = await fetch('/api/users/' + user._id, {
            method: 'PATCH',
            body: JSON.stringify(teaching_skill),
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

            dispatch({type: 'SET_USER', payload: json})

            console.log("new data added, json")
        }
    }

    return (
        <div>
             <div className="container">
                <form className='form' onSubmit={handleSubmit}>                    
                    <label htmlFor="Name">Skill Name</label>
                    <input type="text" placeholder='enter skill' name="Name"
                    onChange={(e) => handleChange(e)}/>

                    <label htmlFor="Description">Description</label>
                    <input type="text" placeholder="enter description" name="Description"
                    onChange={(e) => handleChange(e)}/>
                    
                    <button type='submit' className='submitButton'>Add </button>
                </form>
            </div>
        </div>
    )
}

export default EditTeachingSkills