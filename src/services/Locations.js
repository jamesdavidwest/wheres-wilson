const API_URL = `http://localhost:8088/roomLocations`;

export const getAllLocations = () => {
	return fetch(API_URL).then((res) => res.json());
};
