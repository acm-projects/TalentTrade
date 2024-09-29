//import { useEffect } from 'react'
import Cards from '../components/Cards'
import NavBar from '../components/PostNavBar';
import './cheryl.css'

const PostHome = () => {
    return (
        <div>
            <NavBar/>
            <div>
                <h1 className='c'>Learn by teaching,<br/>
                Teach by learning.
                </h1>
            </div>
            <div className='topBackground'></div>
            <div>
                <Cards/>
            </div>
            <div className='darkBackground'>
                <h2 className='white c'>Welcome to TalentTrade!</h2>
                <h4 className='white c'>Connect, Teach, and Learn</h4>
            </div>
           
        </div>
    )
}

export default PostHome