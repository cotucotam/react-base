import React from 'react';
import videoHomePage from "../../assets/homepage.mp4"
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
const Homepage = () => {
    const navigate = useNavigate()
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const { t, i18n } = useTranslation()
    // const account = useSelector(state => state.user.account)
    return (
        <div className='homepage-container'>
            <video autoPlay muted loop width="750" height="500">
                <source
                    src={videoHomePage}
                    type="video/mp4" />
            </video>
            <div className="homepage-content">
                <div className='title-1'>
                    {t('homepage.title1')}
                </div>
                <div className='title-2'>
                    {t('homepage.title2')}
                </div>
                <div className='title-3'>
                    {isAuthenticated === false ?
                        <button onClick={() => { navigate('/login') }}>
                            {t('homepage.title3.login')}
                        </button>
                        :
                        <button onClick={() => { navigate('/users') }}>
                            {t('homepage.title3.users')}
                        </button>}

                </div>
            </div>
        </div>
    );
};

export default Homepage;