import axios from 'axios';
import { getUserToken } from '../auth/Authentication';

const useAnswerAPI = () => {
	const getAllAnswers = async (questionId) => {
		return axios({
			method: 'GET',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/answers/question/${questionId}`,
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
			return res.data;
		});
	};

	const getAnswer = async (answerId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		return axios
			.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/answers/${answerId}`, {
				headers,
			})
			.then((res) => {
				return res.data;
			});
	};

	const updateAnswer = async (editedAnswer) => {
		const { _id, answer, likes, dislikes, createdBy } = editedAnswer;
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		return axios
			.patch(
				`${process.env.REACT_APP_SERVER_URL}/api/v1/answers/${_id}`,
				{ answer, likes, dislikes, createdBy },
				{
					headers,
				}
			)
			.then((res) => {
				return res.data;
			});
	};

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
		getAnswer,
		updateAnswer,
	};
};

export default useAnswerAPI;
