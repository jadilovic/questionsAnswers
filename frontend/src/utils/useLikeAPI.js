import axios from 'axios';
import { getUserToken } from '../auth/Authentication';

const useLikeAPI = () => {
	const createLike = async (newLike) => {
		return await axios({
			method: 'POST',
			url: `${process.env.REACT_APP_SERVER_URL}/api/v1/likes`,
			data: {
				newLike,
			},
			headers: {
				authorization: `Bearer ${getUserToken()}`,
			},
		}).then((res) => {
			return res.data;
		});
	};

	const getLike = async (questionId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		try {
			return await axios
				.get(`${process.env.REACT_APP_SERVER_URL}/api/v1/likes/${questionId}`, {
					headers,
				})
				.then((res) => {
					return res.data;
				});
		} catch (err) {
			console.log(err.response);
		}
	};

	const getLikeAnswer = async (answerId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		try {
			return await axios
				.get(
					`${process.env.REACT_APP_SERVER_URL}/api/v1/likes/answer/${answerId}`,
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

	const deleteLike = async (likeId) => {
		const headers = {
			Authorization: `Bearer ${getUserToken()}`,
		};
		try {
			await axios
				.delete(`${process.env.REACT_APP_SERVER_URL}/api/v1/likes/${likeId}`, {
					headers,
				})
				.then((res) => {
					return res.data;
				});
		} catch (err) {
			console.log(err.response);
		}
	};

	return {
		getLike,
		deleteLike,
		createLike,
		getLikeAnswer,
	};
};

export default useLikeAPI;
