//import { useEffect } from 'react'
import Cards from '../components/Cards'
//change to prenavabr when done
import NavBar from '../components/PostNavBar';
import './cheryl.css'

const Home = () => {
    return (
        <div>
            <NavBar/>
            <div>
                <h1>Learn by teaching,<br/>
                Teach by learning.
                </h1>
            </div>
            <div className='topBackground'></div>
            <div>
                <Cards/>
            </div>
            <div className='darkBackground'>
                <h2 className='white'>Join TalentTrade today!</h2>
                <h4 className='white'>Connect, Teach, and Learn</h4>
            </div>
           
        </div>
    )
}

export default Home