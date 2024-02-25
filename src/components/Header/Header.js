import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink, useNavigate } from "react-router-dom";  /// điều hướng
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../services/apiServices';
import { toast } from 'react-toastify';
import { doLogout } from '../../redux/action/userAction';
const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const handleLogin = () => {
        dispatch(doLogout())
        navigate('/login')
    }
    const handleLogOut = async() => {
        let res = await logout("account.email" ,account.refresh_token );
        if(res && res.EC === 0){
            navigate('/login')
        }else {
            toast.error(res.EM);
        }
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <NavLink to="/" className='navbar-brand'>Hỏi Dân IT</NavLink>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/users" className='nav-link'>User</NavLink>
                        <NavLink to="/admins" className='nav-link'>Admin</NavLink>
                        {/* <Nav.Link to="/">Home</Nav.Link>
                        <Nav.Link to="/users">User</Nav.Link>
                        <Nav.Link to="/admins">Admin</Nav.Link> */}
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?

                        <>
                            <button className="btn-login" onClick={() => handleLogin()}>Login</button>
                            <button className="btn-signup">Sign Up</button>
                        </>
                        :
                            <NavDropdown title="Settings" id="basic-nav-dropdown">
                                <NavDropdown.Item >Profile</NavDropdown.Item>
                                <NavDropdown.Item onClick={() => handleLogOut()} >Log Out</NavDropdown.Item>
                            </NavDropdown>

                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;