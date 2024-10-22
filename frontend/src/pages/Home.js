//import { useEffect } from 'react'
import Cards from '../components/homeCards/Cards'
import NavBar from '../components/NavBarPost/NavBar';
import './cheryl.css'
import './Home.css'
import 'animate.css'

const PostHome = () => {
    return (
        <div>
            <NavBar/>
            <div className=''>
                <h1 className='c animate__animated animate__fadeInDown'>Learn by teaching,<br/>
                teach by learning.
                </h1>
            </div>
            <div className='topBackground c'></div>
            <div>
                <Cards/>
            </div>
            <div className='darkBackground c'>
                <p className='white h2c c'>Welcome to TalentTrade!</p>
                <h4 className='white c'>Connect, teach, and learn</h4>
            </div>
           
        </div>
    )
}

export default PostHome