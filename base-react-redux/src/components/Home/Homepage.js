import React from 'react';
import videoHomePage from "../../assets/homepage.mp4"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const Homepage = () => {
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    // const account = useSelector(state => state.user.account)
    return (
        <div className='homepage-container'>
            <video autoPlay muted loop width="750" height="500">
                <source
                    src={videoHomePage}
                    type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className='title-1'>Here's a better way to ask</div>
                <div className='title-2'>You don't answer one. Create a typeform instead-and make everyone happe</div>
                <div className='title-3'>
                    {isAuthenticated === false ?
                        <button onClick={() => { navigate('/login') }}>Get 's started.It's free</button>
                        :
                        <button onClick={() => { navigate('/users') }}>Doing Quiz Now</button>}

                </div>
            </div>
        </div>
    );
};

export default Homepage;