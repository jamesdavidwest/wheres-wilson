// SignIn.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import "./SignIn.css";
import { Form } from "react-bootstrap";

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
		<div className="signin-container">
			<div className="signin-card">
				<h2>Sign In</h2>
				<form onSubmit={handleSubmit}>
					<Form.Control
						type="email"
						name="Email"
						placeholder="Enter email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						className="mb-4"
					/>
					{/* <div className="form-group"></div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div> */}
					<div className="signin-card-footer">
            <button type="submit">Sign In</button>
          </div>
				</form>
			</div>
		</div>
	);
};

SignIn.propTypes = {
	onSubmit: PropTypes.func.isRequired,
};
