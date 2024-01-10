import React, { useState } from 'react';
import "./Login.scss"
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../services/apiService';
import { toast } from 'react-toastify';
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useDispatch } from 'react-redux';
import { fetchUserSuccess } from '../redux/action/userAction';
import { ImSpinner10 } from 'react-icons/im'
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const [isShowPassword, setIsShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch()

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
        setIsLoading(true)
        let data = await postLogin(email, password)
        console.log("res ", data)
        if (data.EC === 0 && data) {
            toast.success(data.EM)
            dispatch(fetchUserSuccess(data))
            setIsLoading(true)
            navigate("/")
        }
        if (+data.EC !== 0 && data) {
            toast.error(data.EM)
            setIsLoading(false)
        }
    }
    const hanleKeyDown = (event) => {
        if (event && event.key === 'Enter') {
            handleLogin()
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
                </div>
                <div className='form-group pass-group'>
                    <label>Password</label>
                    <input className='form-control'
                        type={isShowPassword ? "text" : "password"}
                        value={password}
                        onChange={(event) => { setPassword(event.target.value) }}
                        onKeyDown={(event) => hanleKeyDown(event)}
                    ></input>
                    {isShowPassword ?
                        <span className="icons-eye"
                            onClick={() => setIsShowPassword(false)}>
                            <VscEye />
                        </span>
                        :
                        <span className="icons-eye"
                            onClick={() => setIsShowPassword(true)}>
                            <VscEyeClosed />
                        </span>
                    }
                </div>
                <div className='form-group'>
                    <span className='forgot-password'>Foget password</span>
                </div>
                <div>
                    <button className='btn_submit'
                        onClick={handleLogin}
                        disabled={isLoading}
                    >
                        {isLoading && <ImSpinner10 className='loaderIcon' />}
                        <span>Login to Co Tam</span>
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
        </div >
    );
};

export default Login;