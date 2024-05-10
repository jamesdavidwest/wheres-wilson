import { Link } from "react-router-dom";
import "./LandingPage.css";
import WilsonLogo from "../assets/WilsonLogo.png";

export const LandingPage = () => {
	return (
		<div className="landing-page">
			<div className="landing-page-content">
				<h1>Where&#39;s Wilson</h1>
				<h2>Home Improvement Management Tool</h2>
				<img src={WilsonLogo} alt="Wilson Logo" className="landing-page-logo" />
				<p>Simplify your home improvement projects with the Where&#39;s Wilson App.</p>
				<p>Create, update, and track your projects in one centralized location.</p>
				<p>Say goodbye to forgotten ideas and hello to organized project management.</p>
				<p>Sign up now and take control of your home maintenance goals!</p>
				<div className="landing-page-buttons">
					<Link to="/signin" className="landing-page-button">
						Sign In
					</Link>
					<Link to="/signup" className="landing-page-button">
						Sign Up
					</Link>
				</div>
			</div>
		</div>
	);
};
