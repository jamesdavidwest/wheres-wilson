import React from "react";
import ReactDOM from "react-dom/client";
import { App } from "./App.jsx";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js';
import 'popper.js/dist/umd/popper.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';


let userFromStorage;

try {
	userFromStorage = JSON.parse(localStorage.getItem("wilson_user"));
} catch (e) {
	console.error(e);
}

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App userFromStorage={userFromStorage} />
	</React.StrictMode>
);
