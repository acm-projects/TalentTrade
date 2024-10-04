import {useSkillContext} from "../../hooks/useSkillContext"

const TeachingCard = ({ teaching_skill, userID }) => {

    
    const { dispatch } = useSkillContext()

    //deleting a skill
    const handleClick = async () => {
        const skill = {
            "skillId": teaching_skill._id,
            "skillType": "teaching", 
        }
        const response = await fetch(`http://localhost:4000/api/users/${userID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(
                skill
              ),
        })
        const json = await response.json()
    
        if (response.ok) {
          dispatch({type: 'DELETE_SKILL', payload: json})
        }
      }

    return (
        <div className='teachingCard border teachingCardText'>
            <div className='top'>
                <div className='topleft'><p className="profileTextHeader c">{teaching_skill.Name}</p></div>
                <div className='topright'> <p className='pc'>{teaching_skill.Rating_score}</p></div>
            </div>
            <div className='descriptionText'> 
                <p className="pc">{teaching_skill.Description}</p>
            </div>
            <div className='bottom'>
                <div><p className="pc bottomleft">Hours Taught: {teaching_skill.Hours_taught}</p></div>
            <div className="bottomright"><span className="material-symbols-outlined" onClick={handleClick}>delete</span></div>
        </div>  
    </div>
    )

}

export default TeachingCard