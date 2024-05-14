// NavBar.jsx
import PropTypes from "prop-types";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import WilsonLogo from "../assets/WilsonLogo.png";
import { Navbar, Nav, Container } from "react-bootstrap";

export const NavBar = ({ isLoggedIn, userName, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate("/");
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <img src={WilsonLogo} alt="Wilson Logo" className="navbar-logo" />
          Where&#39;s Wilson?
        </Navbar.Brand>
        <Navbar.Text className="navbar-greeting">{userName}</Navbar.Text>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          {isLoggedIn ? (
            <>
              <Nav className="ms-auto">
              </Nav>
              
              <Nav>
                <Nav.Link as={Link} to="/projects">Projects</Nav.Link>
                <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
                <Nav.Link as={Link} to="/" onClick={handleLogout}>Sign Out</Nav.Link>
              </Nav>
            </>
          ) : (
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/signin">Sign In</Nav.Link>
              <Nav.Link as={Link} to="/signup">Sign Up</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

NavBar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  onLogout: PropTypes.func.isRequired,
};

NavBar.defaultProps = {
  userName: "",
};