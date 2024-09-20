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
            
        </div>
    )
}

export default Home