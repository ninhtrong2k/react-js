import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postRegister } from '../../services/apiServices';
import { ToastContainer, toast } from 'react-toastify';



import { Icon } from 'react-icons-kit';
import { eyeOff } from 'react-icons-kit/feather/eyeOff';
import { eye } from 'react-icons-kit/feather/eye'

import './Login.scss';
import Language from '../Header/Language';
const Register = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUserName] = useState("");
    const [role, setRole] = useState("USER");

    const [type, setType] = useState('password');
    const [icon, setIcon] = useState(eyeOff);


    const navigate = useNavigate();


    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    const handleRegistre = async () => {
        const isValidateEmail = validateEmail(email);
        if (!isValidateEmail){
            toast.error("Invalid email");
            return;
        
        }
        let data = await postRegister(email, password, username, role);
        if(data && data.EC === 0){
            toast.success(data.EM)
            navigate('/')
        };
        if(data && data.EC !== 0){
            toast.error(data.EM)
        }
    }

    const handleToggle = () => {
        if (type === 'password') {
            setIcon(eye);
            setType('text')
        } else {
            setIcon(eyeOff)
            setType('password')
        }
    }
    return (
        <div className="login-register-container">
            <div className='header'>
                <span>
                    You have account ?
                </span>
                <button onClick={() => navigate('/login')}>Login</button>
                <Language/>
            </div>
            {/* <div className='title col-4 mx-auto'>
                Hỏi dân it
            </div> */}
            <div className='welcome col-4 mx-auto'>
                Register 
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
                    <label>UserName</label>
                    <input
                        type={'text'}
                        className='form-control'
                        value={username}
                        onChange={(event) => setUserName(event.target.value)}
                    ></input>
                </div>
                <div className='from-group'>
                    <label>Password</label>
                    <div className='from-pass'>
                    <input
                        type={type}
                        className='form-control'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                    <span className="hiden-show-pass" onClick={handleToggle}>
                        <Icon className="absolute mr-10" icon={icon} size={25} />
                    </span>
                    </div>
                </div>
                <span className='forgot-password'>Forgot password ?</span>
                <div>
                    <button
                        className='btn-submit'
                        onClick={(event) => handleRegistre()}
                    >Registre</button>
                </div>
                <div className='text-center'>
                    <span className='back' onClick={() => { navigate('/') }} > Go to Homepage</span>
                </div>
            </div>
        </div>
    );
}
export default Register;