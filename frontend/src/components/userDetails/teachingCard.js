const TeachingCard = ({ teaching_skill }) => {

    const handleClick = async  () => {

    }

    return (
        <div className='teachingCard border teachingCardText'>
            <div className='top'>
                <div className='topleft'><h5>{teaching_skill.Name}</h5></div>
                <div className='topright'> <h6>{teaching_skill.Rating_score}</h6> </div>
            </div>
            <div className='descriptionText'> 
                <h6>{teaching_skill.Description}</h6>
                <div className='bottom'>
                    <h6>Hours Taught: {teaching_skill.Hours_taught}</h6>
                </div>
            </div>
        </div>
    )

}

export default TeachingCard