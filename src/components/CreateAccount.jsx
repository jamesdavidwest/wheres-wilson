import { useState } from "react";
import "./CreateAccount.css";
import { createUser } from "../services/Users.jsx";
import { useNavigate } from "react-router-dom";

export const CreateAccount = ({ onSignIn }) => {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");
	const navigate = useNavigate();

	const handleCreateAccount = () => {
		const newUser = {
			
			name,
			email,
			phonenumber: phone,
			address,
		};

		createUser(newUser)
      .then((createdUser) => {
        // console.log("Account created successfully:", createdUser);
        onSignIn(createdUser.email)
          .then((signInSuccessful) => {
            if (signInSuccessful) {
              navigate("/projects");
            } else {
              console.error("Error signing in after account creation");
            }
          })
          .catch((error) => {
            console.error("Error signing in after account creation:", error);
          });
      })
      .catch((error) => {
        console.error("Error creating account at createUser:", error);
      });
	};

	return (
		<div className="user-profile">
			<h1>Create an Account</h1>
			<div className="profile-form">
				<label>
					Name:
					<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
				</label>
				<label>
					Email:
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</label>
				<label>
					Phone:
					<input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
				</label>
				<label>
					Address:
					<input type="address" value={address} onChange={(e) => setAddress(e.target.value)} />
				</label>
				<button onClick={handleCreateAccount}>Create Account</button>
			</div>
		</div>
	);
};
