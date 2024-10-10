import {useSkillContext} from "../../hooks/useSkillContext"

const LearningCard = ({ learning_skill, userID }) => {
    const { dispatch } = useSkillContext()
    const handleClick = async () => {
        const skill = {
            "skillId": learning_skill._id,
            "skillType": "learning", 
        }
        console.log(skill)
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
        <div className='teachingCard border center c' key={learning_skill._id}>
            <p className='profileTextHeader c textCenter topPadding'>{learning_skill.Name}</p> 
            {learning_skill.Description && <span className="pc padding10 c">{learning_skill.Description}</span>}
            <div className="bottomright c"><span className="material-symbols-outlined c" onClick={handleClick}>delete</span></div>
        </div>
    )
}

export default LearningCard