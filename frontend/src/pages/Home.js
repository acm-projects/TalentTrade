//import { useEffect } from 'react'
import Cards from '../components/homeCards/Cards'
import './Home.css'

const Home = () => {
    return (
        <div>
            <h1>Learn by teaching,<br/>
            Teach by learning.
            </h1>
            <div class='body'>
                <Cards/>
            </div>
            <h2>Join TalentTrade today!</h2>
            <h4>Connect, Teach, and Learn</h4>
            
        </div>
    )
}

export default Home