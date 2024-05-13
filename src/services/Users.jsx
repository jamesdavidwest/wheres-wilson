const API_URL = "http://localhost:8088/users";

export const getAllUsers = () => {
	return fetch(`${API_URL}`).then((res) => res.json());
};

export const getUserById = (userId) => {
	const storedUser = JSON.parse(localStorage.getItem("wilson_user"));
	if (storedUser) {
		return fetch(`${API_URL}/${userId}`).then((res) => res.json());
	} else {
		return Promise.reject("User not found in local storage");
	}
};

export const getUserByEmail = (email) => {
	return fetch(`${API_URL}?email=${email}`)
		.then((res) => res.json())
		.then((users) => users[0]);
};

export const createUser = (newUser) => {
	return fetch(`${API_URL}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(newUser),
	}).then((res) => res.json());
};
