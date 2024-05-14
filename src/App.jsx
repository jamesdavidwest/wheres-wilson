import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import PropTypes from "prop-types";
import { NavBar } from "./components/NavBar.jsx";
import { ProjectsList } from "./pages/Projects.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";
import { Authorized } from "./pages/Authorized.jsx";
import { useEffect, useState } from "react";
import { SignIn } from "./components/SignIn.jsx";
import { getUserByEmail } from "./services/Users.jsx";
// import { ProjectDetails } from "./components/ProjectDetails.jsx";
// import { CreateProject } from "./components/CreateProject.jsx";
import { ProjectForm } from "./components/ProjectForm.jsx";
import { CreateAccount } from "./components/CreateAccount.jsx";

export const App = ({ userFromStorage }) => {
	const [loggedInUser, setLoggedInUser] = useState(userFromStorage || {});
	const [isLoggedIn, setIsLoggedIn] = useState(loggedInUser?.id ? true : false);
	const [userName, setUserName] = useState(loggedInUser?.name || "");

	useEffect(() => {
		const checkUserData = () => {
			if (loggedInUser?.id) {
				setUserName(loggedInUser.name);
				setIsLoggedIn(true);
			} else {
				setIsLoggedIn(false);
				setUserName("");
			}
		};

		checkUserData();
	}, [loggedInUser]);

	const handleLogout = () => {
		localStorage.removeItem("wilson_user");
		setIsLoggedIn(false);
		setUserName("");
	};

	const handleSignIn = async (email) => {
		try {
			const user = await getUserByEmail(email);
			if (user) {
				localStorage.setItem("wilson_user", JSON.stringify(user));
				setIsLoggedIn(true);
				setUserName(user.name);
				setLoggedInUser(user);
				return true;
			} else {
				alert("Invalid email from getUserByEmail. Please try again.");
				return false;
			}
		} catch (error) {
			console.error("Error:", error);
			return false;
		}
	};

	return (
		<>
			<Router>
				<div>
					<NavBar isLoggedIn={isLoggedIn} userName={userName} onLogout={handleLogout}></NavBar>
					<Routes>
						<Route path="/" element={<LandingPage />} />
						{isLoggedIn && <Route path="/" element={<Navigate to="/projects" />} />}
						{isLoggedIn && <Route path="/signin" element={<Navigate to="/projects" />} />}

						<Route
							path="/projects"
							element={
								<Authorized authorized={isLoggedIn}>
									<ProjectsList loggedInUser={loggedInUser} />
								</Authorized>
							}
						/>
						<Route
							path="/projects/:id"
							element={
								<Authorized authorized={isLoggedIn}>
									<ProjectForm />
								</Authorized>
							}
						/>
						<Route
							path="/profile"
							element={
								<Authorized authorized={isLoggedIn}>
									<UserProfile />
								</Authorized>
							}
						/>
						<Route path="/signin" element={<SignIn onSubmit={handleSignIn} />} />

						<Route path="/logout" element={<LandingPage />} />
						<Route path="/signup" element={<CreateAccount onSignIn={handleSignIn} />} />
						<Route
							path="/projects/new"
							element={
								<Authorized authorized={isLoggedIn}>
									<ProjectForm loggedInUser={loggedInUser} />
								</Authorized>
							}
						/>
					</Routes>
				</div>
			</Router>
		</>
	);
};

App.propTypes = {
	userFromStorage: PropTypes.object,
};
