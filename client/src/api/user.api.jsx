import axios from "axios";

export const registerUser = async (userData) => {
	try {
		await axios.post(import.meta.env.VITE_API_USER_REGISTER, userData);
	} catch (error) {
		throw new Error(error.response.data);
	}
};

export const loginUser = async (userData) => {
	try {
		const response = await axios.post(
			import.meta.env.VITE_API_USER_LOGIN,
			userData
		);
		const token = response.data.token;
		localStorage.setItem("token", token);
	} catch (error) {
		throw new Error(error.data);
	}
};

export const getDataUser = async (id) => {
	try {
		const token = localStorage.getItem("token");
		return await axios.get(`${import.meta.env.VITE_API_USER_PROFILE}${id}`, {
			headers: {
				"user-token": token,
			},
		});
	} catch (error) {
		throw new Error(error.response.data);
	}
};

export const home = async () => {
	try {
		const token = localStorage.getItem("token");
		return await axios.get(import.meta.env.VITE_API_USER_HOME, {
			headers: {
				"user-token": token,
			},
		});
	} catch (error) {
		throw new Error(error.response.data);
	}
};

export const desactivateUser = async (id) => {
	try {
		const token = localStorage.getItem("token");
		return await axios.put(
			`${import.meta.env.VITE_API_USERS}${id}${
				import.meta.env.VITE_API_USERS_DES
			}`,
			{},
			{
				headers: {
					"user-token": token,
				},
			}
		);
	} catch (error) {
		throw new Error(error.response.data);
	}
};

export const updateUser = async (formData, userId) => {
	try {
		const token = localStorage.getItem("token");
		return await axios.put(
			`${import.meta.env.VITE_API_USERS}${userId}`,
			formData,
			{
				headers: {
					"user-token": token,
				},
			}
		);
	} catch (error) {
		throw new Error(error.response.data);
	}
};
