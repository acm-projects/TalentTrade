const TeachingCard = ({ teaching_skill }) => {

    const handleClick = async  () => {

    }

    return (
        <div className='teachingCard border teachingCardText'>
            <div className='top'>
                <div className='topleft'><p className="profileTextHeader c">{teaching_skill.Name}</p></div>
                <div className='topright'> <p className='pc'>{teaching_skill.Rating_score}</p> </div>
            </div>
            <div className='descriptionText'> 
                <p className="pc">{teaching_skill.Description}</p>
                <div className='bottom'>
                    <p className="pc">Hours Taught: {teaching_skill.Hours_taught}</p>
                </div>
            </div>
        </div>
    )

}

export default TeachingCard