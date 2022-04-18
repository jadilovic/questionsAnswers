import axios from 'axios';
import { getUserToken } from '../auth/Authentication';

const useQuestionAPI = () => {
	const getAllQuestions = async () => {
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/questions`,
			headers: {
				authorization: `Bearer ${getUserToken()}`,
			},
		}).then((res) => {
			return res.data.questions;
		});
	};

	const createQuestion = async (newQuestion) => {
		return await axios({
			method: 'POST',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/questions`,
			data: {
				newQuestion,
			},
			headers: {
				authorization: `Bearer ${getUserToken()}`,
			},
		}).then((res) => {
			console.log('question created: ', res.data);
			return res.data;
		});
	};

	// const getTask = async (taskId) => {
	// 	const headers = {
	// 		Authorization: `Bearer ${getUserToken()}`,
	// 	};
	// 	return axios
	// 		.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/${taskId}`, {
	// 			headers,
	// 		})
	// 		.then((res) => {
	// 			return res.data;
	// 		});
	// };

	// const updateTask = async (editedTask) => {
	// 	const { _id, name, currentStatus, description, avatarColor, avatarIcon } =
	// 		editedTask;
	// 	const headers = {
	// 		Authorization: `Bearer ${getUserToken()}`,
	// 	};
	// 	return axios
	// 		.patch(
	// 			`${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/${_id}`,
	// 			{ name, currentStatus, description, avatarColor, avatarIcon },
	// 			{
	// 				headers,
	// 			}
	// 		)
	// 		.then((res) => {
	// 			return res.data;
	// 		});
	// };

	// const deleteTask = async (taskId) => {
	// 	const headers = {
	// 		Authorization: `Bearer ${getUserToken()}`,
	// 	};
	// 	try {
	// 		await axios
	// 			.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/tasks/${taskId}`, {
	// 				headers,
	// 			})
	// 			.then((res) => {
	// 				console.log('task deleted: ', res.data);
	// 			});
	// 	} catch (err) {
	// 		console.log(err.response);
	// 	}
	// };

	return {
		//	deleteTask,
		getAllQuestions,
		createQuestion,
		//	getTask,
		//	updateTask,
	};
};

export default useQuestionAPI;
