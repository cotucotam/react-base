import React, { useState } from 'react';
import "./Login.scss"
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../services/apiService';
import { toast } from 'react-toastify';
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleLogin = async () => {
        //validate
        const isValidEmail = validateEmail(email)
        if (!isValidEmail) {
            toast.error("inavalid email")
            return
        }
        if (!password) {
            toast.error("inavalid password")
            return
        }
        //login api
        let data = await postLogin(email, password)
        console.log("res ", data)
        if (data.EC === 0 && data) {
            toast.success(data.EM)
            navigate("/")
        }
        if (+data.EC !== 0 && data) {
            toast.error(data.EM)
        }
    }

    return (
        <div className='login-container'>
            <div className='header'>
                <span>Don't have an account yet?</span>
                <button>Sign up</button>
            </div>
            <div className='title col-4 mx-auto'>
                Co Tam
            </div>
            <div className='welcome col-4 mx-auto'>

            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='form-group'>
                    <label>Email</label>
                    <input type='email' className='form-control'
                        value={email}
                        onChange={(event) => { setEmail(event.target.value) }}></input>
                    <label>Password</label>
                    <input type='Password' className='form-control'
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}></input>


                </div>
                <span className='forgot-password'>Foget password</span>
                <div>
                    <button className='btn_submit'
                        onClick={handleLogin}>
                        Login to Co Tam
                    </button>
                </div>
                <div className='back'>
                    <span onClick={() => {
                        navigate('/')
                    }}>
                        &#60;&#60; Go to Homepage

                    </span>
                </div>
            </div>
        </div>
    );
};

export default Login;