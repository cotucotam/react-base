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
        </div>
    );
};

export default Homepage;