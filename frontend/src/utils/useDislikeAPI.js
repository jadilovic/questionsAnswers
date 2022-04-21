import axios from 'axios';
import { getUserToken } from '../auth/Authentication';

const useDislikeAPI = () => {
	const createDislike = async (newDislike) => {
		return await axios({
			method: 'POST',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/dislikes`,
			data: {
				newDislike,
			},
			headers: {
				authorization: `Bearer ${getUserToken()}`,
			},
		}).then((res) => {
			return res.data;
		});
	};

	const getDislike = async (questionId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		try {
			return await axios
				.get(
					`${process.env.REACT_APP_SERVER_URL}/api/v1/dislikes/${questionId}`,
					{
						headers,
					}
				)
				.then((res) => {
					return res.data;
				});
		} catch (err) {
			console.log(err.response);
		}
	};

	const getDislikeAnswer = async (answerId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		try {
			return await axios
				.get(
					`${process.env.REACT_APP_SERVER_URL}/api/v1/dislikes/answer/${answerId}`,
					{
						headers,
					}
				)
				.then((res) => {
					return res.data;
				});
		} catch (err) {
			console.log(err.response);
		}
	};

	const deleteDislike = async (dislikeId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		try {
			await axios
				.delete(
					`${process.env.REACT_APP_SERVER_URL}/api/v1/dislikes/${dislikeId}`,
					{
						headers,
					}
				)
				.then((res) => {
					return res.data;
				});
		} catch (err) {
			console.log(err.response);
		}
	};

	return {
		getDislike,
		deleteDislike,
		createDislike,
		getDislikeAnswer,
	};
};

export default useDislikeAPI;
