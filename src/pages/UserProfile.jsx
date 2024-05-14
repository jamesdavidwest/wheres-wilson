import { useEffect, useState } from "react";
import "./UserProfile.css";
import { getUserById } from "../services/Users.jsx";

export const UserProfile = () => {
	const [user, setUser] = useState(null);
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [phone, setPhone] = useState("");
	const [address, setAddress] = useState("");

	useEffect(() => {
		const wilsonUser = JSON.parse(localStorage.getItem("wilson_user"));
		if (wilsonUser) {
			getUserById(wilsonUser.id)
				.then((userData) => {
					setUser(userData);
					setName(userData.name);
					setEmail(userData.email);
					setPhone(userData.phoneNumber);
					setAddress(userData.address);
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		}
	}, []);

	const handleSaveChanges = () => {
		//TODO: Implement logic to save updated profile
		//for now, just reload the page
		window.location.reload;
	};

	if (!user) {
		return <div>Loading...</div>;
	}

	return (
		<div className="user-profile">
			<h1>Where&#39;s Wilson? User Profile</h1>
			<div className="profile-form">
				<label className="profile-font">
					Name
					<input type="text" value={name} onChange={(e) => setName(e.target.value)} />
				</label>
				<label className="profile-font">
					Email
					<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
				</label>
				<label className="profile-font">
					Phone
					<input type="phone" value={phone} onChange={(e) => setPhone(e.target.value)} />
				</label>
				<label className="profile-font">
					Address
					<input type="address" value={address} onChange={(e) => setAddress(e.target.value)} />
				</label>
				<button onClick={handleSaveChanges}>Save Changes</button>
			</div>
		</div>
	);
};
