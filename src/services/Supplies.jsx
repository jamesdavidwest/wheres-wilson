const API_URL = `http://localhost:8088/supplies`;

export const getSuppliesByProjectId = (projectId) => {
	return fetch(`${API_URL}?projectId=${projectId}`).then((res) => res.json());
};

export const getSupplyById = (supplyId) => {
	return fetch(`${API_URL}/${supplyId}`).then((res) => res.json());
};

export const getSupplyByName = (supplyName) => {
	return fetch(`${API_URL}?name=${supplyName}`)
		.then((res) => res.json())
		.then((supplies) => supplies[0]);
};

export const createSupply = (newSupply) => {
	return fetch(API_URL, {
		method: "POST",
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newSupply),
	})
		.then((res) => res.json())
}

export const updateSupply = (supplyId, updatedSupply) => {
	return fetch(`${API_URL}/${supplyId}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(updatedSupply),
	}).then((res) => res.json());
};
