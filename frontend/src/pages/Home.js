import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cards from '../components/homeCards/Cards';
import NavBar from '../components/NavBarPost/PostNavBar';
import './cheryl.css';

const PostHome = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('userInfo'));
        if (!user) {
            navigate('/');
        }
    }, [navigate]);

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
                <p className='white h2c c'>Welcome to TalentTrade!</p>
                <h4 className='white c'>Connect, Teach, and Learn</h4>
            </div>
        </div>
    );
};

export default PostHome;