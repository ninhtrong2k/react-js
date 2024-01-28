import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { NavLink , useNavigate } from "react-router-dom";  /// điều hướng
const Header = () => {

    const navigate = useNavigate();
    const handleLogin = () => {
        navigate('/login')
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
                        <button className="btn-login" onClick={()=> handleLogin()}>Login</button>
                        <button className="btn-signup">Sign Up</button>
                        {/* <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item >Action</NavDropdown.Item>
                            <NavDropdown.Item >
                                Another action
                            </NavDropdown.Item>
                            <NavDropdown.Item >Login</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item >Log Out</NavDropdown.Item>
                            <NavDropdown.Item >Profile</NavDropdown.Item>

                        </NavDropdown> */}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;