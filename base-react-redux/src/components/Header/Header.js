import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
const Header = () => {
    const isAuthenticated = useSelector(state => state.user.isAuthenticated)
    const account = useSelector(state => state.user.account)
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate("/login");
    }
    const handleSignUp = () => {
        navigate("/register");
    }
    return (
        <Navbar expand="lg" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/">Co Tam</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to="/" className='nav-link'>Home</NavLink>
                        <NavLink to="/users" className='nav-link'>User</NavLink>
                        <NavLink to="/admin" className='nav-link'>Admin</NavLink>
                    </Nav>
                    <Nav>
                        {isAuthenticated === false ?
                            <>
                                <button className='btn-log-in'
                                    onClick={handleLogin}>
                                    Log In
                                </button>
                                <button className='btn-sign-up'
                                    onClick={handleSignUp}>
                                    Sign Up</button>
                            </> :
                            <NavDropdown title="Setting" id="basic-nav-dropdown">
                                <NavDropdown.Item>
                                    Log Out
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item >Profile</NavDropdown.Item>
                            </NavDropdown>

                        }
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Header;