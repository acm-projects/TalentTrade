//import { useEffect } from 'react'
import Cards from '../components/homeCards/Cards'
import NavBar from '../components/NavBarPost/NavBar'
import './Home.css'
import './cheryl.css'
import 'animate.css'

const PostHome = () => {
    return (
        <div>
            <NavBar/>
            <div>
                <div className='home-header'>
                    <h1 className='c animate__animated animate__fadeInDown'>Learn by teaching,<br/>
                    teach by learning.
                    </h1>
                </div>
            </div>
            <div className='top-background'></div>
            <div>
                <Cards/>
            </div>
            <div className='darkBackground'>
                <p className='white h2c c'>Welcome to TalentTrade!</p>
                <p className='caps-subtitle'>CONNECT, TEACH, and LEARN</p>
            </div>
           
        </div>
    )
}

export default PostHome