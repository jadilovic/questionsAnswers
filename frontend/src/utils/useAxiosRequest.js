import axios from 'axios';
import { getUserToken } from '../auth/Authentication';

const useAxiosRequest = () => {
	const createUser = async (userCredentials) => {
		return axios({
			method: 'POST',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/signup`,
			data: {
				firstName: userCredentials.firstName,
				lastName: userCredentials.lastName,
				email: userCredentials.email,
				password: userCredentials.password,
			},
			headers: new Headers({ 'Content-Type': 'application/json' }),
		}).then((res) => {
			return res.data;
		});
	};

	const userLogin = async (userCredentials) => {
		return axios({
			method: 'POST',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/auth/login`,
			data: {
				email: userCredentials.email,
				password: userCredentials.password,
			},
			headers: new Headers({ 'Content-Type': 'application/json' }),
		}).then((res) => {
			return res.data;
		});
	};

	const updateUser = async (editedUser) => {
		const { firstName, lastName, email, answers } = editedUser;
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		return axios
			.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/v1/users`,
				{ firstName, lastName, email, answers },
				{
					headers,
				}
			)
			.then((res) => {
				return res.data;
			});
	};

	const getUser = async (userId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		return axios
			.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/users/${userId}`, {
				headers,
			})
			.then((res) => {
				return res.data;
			});
	};

	const getAllUsers = async () => {
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/users/allusers`,
			headers: {
				authorization: `Bearer ${getUserToken()}`,
			},
		}).then((res) => {
			return res.data.users;
		});
	};

	return {
		getAllUsers,
		getUser,
		createUser,
		userLogin,
		updateUser,
	};
};

export default useAxiosRequest;
