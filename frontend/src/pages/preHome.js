//import { useEffect } from 'react'
import Cards from '../components/homeCards/Cards'
//change to prenavabr when done
import NavBar from '../components/NavBarPre/NavBar';
import './cheryl.css'
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <NavBar/>
            <div>
                <h1 className='c'>Learn by teaching,<br/>
                Teach by learning.
                </h1>
            </div>
            <div className='topBackground c'></div>
            <div>
                <Cards/>
            </div>
            <div className='darkBackground c'>
                <p className='white h2c c'>Join TalentTrade today!</p>
                <h4 className='white c'>Connect, Teach, and Learn</h4>
            </div>
           
        </div>
    )
}

export default Home