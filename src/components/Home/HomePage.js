import { useSelector } from 'react-redux';
import videoHomePage from '../../assets/video-homepage.mp4';
import { useNavigate } from 'react-router-dom';
const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();
    // const account = useSelector(state => state.user.account)
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomePage} type='video/mp4'>

                </source>
            </video>
            <div className='homepage-content'>
                <div className='title-1'>Forms that
                    break the norm</div>
                <div className='title-2'>
                    Get more data—like signups, feedback, and anything else—with forms designed to be refreshingly different
                </div>
                <div className='title-3'>
                    {isAuthenticated === false ?
                        <button onClick={()=> navigate('/login')}> Bla bla Bla bla Bla bla Bla bla</button>

                        : <button onClick={()=> navigate('/users')}>Doing Quiz Now</button>}
                </div>
            </div>
        </div>
    )
}
export default HomePage;