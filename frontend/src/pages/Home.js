//import { useEffect } from 'react'
import Cards from '../components/homeCards/Cards'
import './Home.css'

const Home = () => {
    return (
        <div>
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