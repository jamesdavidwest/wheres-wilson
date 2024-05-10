import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { NavBar } from "./components/NavBar.jsx";
import { ProjectsList } from "./pages/Projects.jsx";
import { UserProfile } from "./pages/UserProfile.jsx";
import { LandingPage } from "./pages/LandingPage.jsx";
import { Authorized } from "./pages/Authorized.jsx";
import { useEffect, useState } from "react";
import { SignIn } from "./components/SignIn.jsx";
import { getUserByEmail, getUserById } from "./services/Users.jsx";

export const App = () => {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [userName, setUserName] = useState("");
	const [authorized, setAuthorized] = useState(false);

	useEffect(() => {
		const checkAuth = async () => {
			const wilsonUser = localStorage.getItem("wilson_user");
			if (wilsonUser) {
				const user = JSON.parse(wilsonUser);
				try {
					const userData = await getUserById(user.id);
					if (userData) {
						setAuthorized(true);
					} else {
						localStorage.removeItem("wilson_user");
					}
				} catch (error) {
					console.error("Error fetching user data:", error);
				}
			}
		};

		checkAuth();
	}, []);

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
				setAuthorized(true);
				setIsLoggedIn(true);
				setUserName(user.name);
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

	useEffect(() => {
		const checkUserData = () => {
			const userData = localStorage.getItem("wilson_user");
			if (userData) {
				const user = JSON.parse(userData);
				setUserName(user.name);
				setIsLoggedIn(true);
				setAuthorized(true);
			} else {
				setIsLoggedIn(false);
				setUserName("");
				setAuthorized(false);
			}
		};

		checkUserData();

		window.addEventListener("storage", checkUserData);
		return () => {
			window.removeEventListener("storage", checkUserData);
		};
	}, []);

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
								<Authorized authorized={authorized}>
									<ProjectsList />
								</Authorized>
							}
						/>
						<Route
							path="/profile"
							element={
								<Authorized authorized={authorized}>
									<UserProfile />
								</Authorized>
							}
						/>
						<Route path="/signin" element={<SignIn onSubmit={handleSignIn} />} />
						<Route path="/signup" element={<div>Sign Up Page</div>} />
						<Route path="/logout" element={<LandingPage />} />
					</Routes>
				</div>
			</Router>
		</>
	);
};
