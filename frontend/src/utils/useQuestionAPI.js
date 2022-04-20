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

	const updateQuestion = async (editedQuestion) => {
		const { _id, title, question, likes, dislikes, createdBy } = editedQuestion;
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		return axios
			.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/v1/questions/${_id}`,
				{ title, question, likes, dislikes, createdBy },
				{
					headers,
				}
			)
			.then((res) => {
				return res.data;
			});
	};

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
		updateQuestion,
	};
};

export default useQuestionAPI;
