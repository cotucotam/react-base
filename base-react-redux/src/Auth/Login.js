import React, { useState } from 'react';
import "./Login.scss"
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const handleLogin = () => {
        alert("alert me")
    }
    return (
        <div className='login-container'>
            <div className='header'>
                Don't have an account yet?
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
            </div>
        </div>
    );
};

export default Login;