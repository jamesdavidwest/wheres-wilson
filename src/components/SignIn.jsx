import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const SignIn = ({ onSubmit }) => {
	const [email, setEmail] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (await onSubmit(email)) {
			navigate("/projects");
		}
	};

	return (
		<div>
			<h2>Sign In</h2>
			<form onSubmit={handleSubmit}> 
				<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
				<button type="submit">Sign In</button>
			</form>
		</div>
	);
};

SignIn.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};
