import PropTypes from "prop-types";
import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";
import WilsonLogo from "../assets/WilsonLogo.png";

export const NavBar = ({ isLoggedIn, userName, onLogout }) => {
	const navigate = useNavigate();
	const handleLogout = () => {
		onLogout();
		navigate("/");
	};

	return (
		<nav className="navbar">
			<div className="navbar-logo">
				<img src={WilsonLogo} alt="Wilson Logo" />
				<Link to="/">Where&#39;s Wilson?</Link>
			</div>
			{isLoggedIn ? (
				<>
					<div className="navbar-greeting">
						<span>Hello, {userName}</span>
					</div>
					<ul className="navbar-links">
						<li>
							<Link to="/projects">Projects</Link>
						</li>
						<li>
							<Link to="/profile">Profile</Link>
						</li>
						<li>
							<Link to="/" onClick={handleLogout}>
								Sign Out
							</Link>
						</li>
					</ul>
				</>
			) : (
				<ul className="navbar-links">
					<li>
						<Link to="/signin">Sign In</Link>
					</li>
					<li>
						<Link to="/signup">Sign Up</Link>
					</li>
				</ul>
			)}
		</nav>
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
