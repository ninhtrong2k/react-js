import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postLogin } from '../../services/apiServices';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import './Login.scss';
import { doLogin } from '../../redux/action/userAction';
import { FaSpinner } from "react-icons/fa";
const Login = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const handleLogin = async () => {
        setIsLoading(true);
        let data = await postLogin(email, password)
        if (data && data.EC === 0) {
            dispatch(doLogin(data))
            toast.success(data.EM)
            setIsLoading(false);
            navigate('/');
        };
        if (data && data.EC !== 0) {
            toast.error(data.EM)
            console.log(data.EM);
            setIsLoading(false);
        }
    }
    const handleKeyDown = (event) => {
        console.log(event.key)
        if(event && event.key === 'Enter'){
            handleLogin();
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
                        onKeyDown={(event) => handleKeyDown(event)}
                    ></input>
                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={(event) => handleLogin()}
                        disabled={isLoading}
                    >
                            {isLoading === true && <FaSpinner className='loaderIcon' />}                        
                                <span>Login to HOIDANIT</span>
                    </button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }} > Go to Homepage</span>
                </div>
            </div>
        </div>
    );
}
export default Login;