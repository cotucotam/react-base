import React from 'react';
import videoHomePage from "../../assets/homepage.mp4"
const Homepage = () => {
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
                    <button>Get 's started.It's free</button>
                </div>
            </div>
        </div>
    );
};

export default Homepage;