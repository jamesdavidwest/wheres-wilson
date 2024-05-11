const API_URL = "http://localhost:8088/projects";

export const getAllProjects = () => {
	return fetch(API_URL).then((res) => res.json());
};

export const getProjectById = (projectId) => {
	return fetch(`${API_URL}/${projectId}`).then((res) => res.json());
};

export const getProjectByStatus = (statusId) => {
	return fetch(`${API_URL}?statusId=${statusId}`).then((res) => res.json());
};

export const getProjectByLocation = (locationId) => {
	return fetch(`${API_URL}?locationId=${locationId}`).then((res) => res.json());
};

export const updateProject = (projectId, updatedProject) => {
	return fetch(`${API_URL}/${projectId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedProject),
	}).then((res) => res.json());
};

export const deleteProject = (projectId) => {
	return fetch(`${API_URL}/${projectId}`, {
		method: "DELETE",
	}).then((res) => res.json());
};
