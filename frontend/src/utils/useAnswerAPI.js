import axios from 'axios';
import { getUserToken } from '../auth/Authentication';

const useAnswerAPI = () => {
	const getAllAnswers = async (questionId) => {
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/answers/${questionId}`,
			headers: {
				authorization: `Bearer ${getUserToken()}`,
			},
		}).then((res) => {
			return res.data.answers;
		});
	};

	const createAnswer = async (newAnswer) => {
		return await axios({
			method: 'POST',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/answers`,
			data: {
				newAnswer,
			},
			headers: {
				authorization: `Bearer ${getUserToken()}`,
			},
		}).then((res) => {
			console.log('answer created: ', res.data);
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

	const deleteAnswer = async (answerId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		try {
			await axios
				.delete(
					`${process.env.REACT_APP_SERVER_URL}/api/v1/answers/${answerId}`,
					{
						headers,
					}
				)
				.then((res) => {
					console.log('answer deleted: ', res.data);
				});
		} catch (err) {
			console.log(err.response);
		}
	};

	return {
		deleteAnswer,
		getAllAnswers,
		createAnswer,
		//	getTask,
		//	updateTask,
	};
};

export default useAnswerAPI;
