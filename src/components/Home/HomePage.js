import { useSelector } from 'react-redux';
import videoHomePage from '../../assets/video-homepage.mp4';
import { useNavigate } from 'react-router-dom';
import { useTranslation, Trans } from 'react-i18next';
const HomePage = (props) => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const navigate = useNavigate();
    // const account = useSelector(state => state.user.account)
    const { t } = useTranslation();
    return (
        <div className="homepage-container">
            <video autoPlay muted loop>
                <source src={videoHomePage} type='video/mp4'>

                </source>
            </video>
            <div className='homepage-content'>
                <div className='title-1'>
                    {t('homepage.title1')}
                    </div>
                <div className='title-2'>
                    Xin chào tên tôi là hoàng ninh trọng tôi đang học lập trình qua bạn hỏi dân it
                </div>
                <div className='title-3'>
                    {isAuthenticated === false ?
                        <button onClick={()=> navigate('/login')}> Mãi yêu lập trình</button>

                        : <button onClick={()=> navigate('/users')}>Mở Bài Tập Bây Giờ</button>}
                </div>
            </div>
        </div>
    )
}
export default HomePage;