import NavBar from '../components/NavBarPost/NavBar'
import LearningSkillsForm from '../components/QuestionForm/LearningSkillsForm'
import { useState } from 'react'
import "animate.css"
const Questionaire = () => {
    const [currentPage, setCurrentPage] = useState(1)

    const handleBack = () => {
        setCurrentPage(currentPage-1)
    }

    const handleNext = () => {
        setCurrentPage(currentPage+1)
    }

    return(
        <div className='qbody c animate__fadeIn animate__animated fade c'>
            <NavBar/>
            <div className='questionaireBackground c'>
                { currentPage==1 && (
                    <div>
                        <div className='animate__animated animate__backInDown c'>
                            <p className='QuestionHeader c'>Let’s learn about you!</p>
                            <p className='QuestionSubheader c'>We want to match you with others who have talents you want to learn and skills that you can teach!</p>
                        </div>
                        <div className='container c questionContainer'>
                            <button onClick={handleNext} className='questionButton c hoverEnlarge2'>Next</button>
                        </div>
                    </div>
                )}
                { currentPage==3 && (
                    <div>
                        <div className='animate__animated animate__fadeInDown c c'> 
                            <p className='QuestionHeader nextQuestionHeader c'>How about teaching?</p>
                            <p className='QuestionSubheader c'>What areas do you feel comfortable in?</p>
                        </div>
                        <div>
                            <LearningSkillsForm/>
                        </div>
                        <div className='container c questionContainer'>
                            <button onClick={handleBack} className='questionButton c hoverEnlarge2'>Back</button>
                            <button onClick={handleNext} className='questionButton c hoverEnlarge2'>Next</button>
                        </div>
                    </div>
                )}
                { currentPage==2 && (
                    <div>
                        <div className='animate__animated animate__fadeInDown c c'> 
                            <p className='QuestionHeader nextQuestionHeader c'>Let’s start with learning.</p>
                            <p className='QuestionSubheader c'>What areas are you interested in?</p>
                        </div>
                        <div>
                            <LearningSkillsForm/>
                        </div>
                        <div className='container c questionContainer'>
                            <button onClick={handleBack} className='questionButton c hoverEnlarge2'>Back</button>
                            <button onClick={handleNext} className='questionButton c hoverEnlarge2'>Next</button>
                        </div>
                    </div>
                )}

            { currentPage==4 && (
                    <div>
                        <div className='animate__animated animate__fadeInDown c c'> 
                            <p className='QuestionHeader nextQuestionHeader c'>Finalize your Profile</p>
                            <p className='QuestionSubheader c'>Let's get to know you!</p>
                        </div>
                        <div>
                            <LearningSkillsForm/>
                        </div>
                        <div className='container c questionContainer'>
                            <button onClick={handleBack} className='questionButton c hoverEnlarge2'>Back</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Questionaire