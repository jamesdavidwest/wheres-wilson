const API_URL = "http://localhost:8088/projectStatus";

export const getAllProjectStatuses = () => {
	return fetch(`${API_URL}`)
		.then((res) => {
			if (!res.ok) {
				throw new Error(`HTTP Error! Status: ${res.status}`);
			}
			return res.json();
		})
		.catch((error) => {
			console.error("Error fetching project statuses at getAllProjectStatuses:", error);
			throw error;
		});
};
