import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { ToastContainer, toast } from 'react-toastify';

import './Login.scss';
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const handleLogin = async() => {
        // alert("me")
        let data = await postLogin(email,password)
        if(data && data.EC === 0){
            toast.success(data.EM)   
            navigate('/');
         };
        if(data && data.EC !== 0){
            toast.error(data.EM)
        }
    }
    return (
        <div className="login-register-container">
            <div className='header'>
                <span>
                    Don't have an account yet ?
                </span>
                <button onClick={() => navigate('/reg')}>Register</button>
            </div>
            <div className='title col-4 mx-auto'>
                Hỏi dân it
            </div>
            <div className='welcome col-4 mx-auto'>
                Hello , who's this ?
            </div>
            <div className='content-form col-4 mx-auto'>
                <div className='from-group'>
                    <label>Email</label>
                    <input
                        type={'email'}
                        className='form-control'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    ></input>
                </div>
                <div className='from-group'>
                    <label>Password</label>
                    <input
                        type={'password'}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    ></input>
                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div>
                    <button 
                    className='btn-submit'
                    onClick={(event) => handleLogin()}
                    >Login to HOIDANIT</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => {navigate('/')}} > Go to Homepage</span>
                </div>
            </div>
        </div>
    );
}
export default Login;