import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";

let loggedInUser;

try {
	loggedInUser = JSON.parse(localStorage.getItem("wilson_user"));
} catch (e) {
	console.error(e);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App loggedInUser={loggedInUser} />
	</React.StrictMode>
);
