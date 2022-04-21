import axios from 'axios';
import { getUserToken } from '../auth/Authentication';

const useQuestionAPI = () => {
	const getAllQuestions = async (userId) => {
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/questions/${userId}`,
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

	return {
		getAllQuestions,
		createQuestion,
		updateQuestion,
	};
};

export default useQuestionAPI;
