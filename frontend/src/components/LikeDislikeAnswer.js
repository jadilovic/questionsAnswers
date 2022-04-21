import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import useLikeAPI from '../utils/useLikeAPI';
import useAnswerAPI from '../utils/useAnswerAPI';
import useDislikeAPI from '../utils/useDislikeAPI';

const LikeDislikeAnswer = (props) => {
	const { userId, answerId } = props;
	const [likeObject, setLikeObject] = useState({});
	const [dislikeObject, setDislikeObject] = useState({});
	const [answer, setAnswer] = useState({});
	const likeAPI = useLikeAPI();
	const answerAPI = useAnswerAPI();
	const dislikeAPI = useDislikeAPI();

	const getAnswer = async () => {
		const data = await answerAPI.getAnswer(answerId);

		setAnswer({ ...data.answer });
		getAnswerLikeStatus();
	};

	const getAnswerLikeStatus = async () => {
		const data = await likeAPI.getLikeAnswer(answerId);
		setLikeObject({ ...data.like });
		getAnswerDislikeStatus();
	};

	const getAnswerDislikeStatus = async () => {
		const data = await dislikeAPI.getDislikeAnswer(answerId);
		setDislikeObject({ ...data.dislike });
	};

	useEffect(() => {
		getAnswer();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const createLike = async () => {
		if (dislikeObject?.answerId) {
			deleteDislike();
			setDislikeObject(null);
		}
		const data = await likeAPI.createLike({ answerId, userId });
		answer.likes = ++answer.likes;
		console.log('answer : ', answer);
		await answerAPI.updateAnswer(answer);
		setAnswer({ ...answer });
		setLikeObject({ ...data.like });
	};

	const deleteLike = async () => {
		await likeAPI.deleteLike(likeObject._id);
		answer.likes = --answer.likes;
		await answerAPI.updateAnswer(answer);
		setAnswer({ ...answer });
		setLikeObject({});
	};

	const handleThumbUp = () => {
		if (!likeObject?.answerId) {
			createLike();
		} else {
			deleteLike();
		}
	};

	const createDislike = async () => {
		if (likeObject?.answerId) {
			deleteLike();
			setLikeObject(null);
		}
		const data = await dislikeAPI.createDislike({ answerId, userId });
		answer.dislikes = ++answer.dislikes;
		await answerAPI.updateAnswer(answer);
		setAnswer({ ...answer });
		setDislikeObject({ ...data.dislike });
	};

	const deleteDislike = async () => {
		await dislikeAPI.deleteDislike(dislikeObject._id);
		answer.dislikes = --answer.dislikes;
		await answerAPI.updateAnswer(answer);
		setAnswer({ ...answer });
		setDislikeObject({});
	};

	const handleThumbDown = () => {
		if (!dislikeObject?.answerId) {
			createDislike();
		} else {
			deleteDislike();
		}
	};

	return (
		<div>
			<IconButton onClick={handleThumbUp}>
				{likeObject?.answerId ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
			</IconButton>
			{answer.likes}{' '}
			<IconButton onClick={handleThumbDown}>
				{dislikeObject?.answerId ? (
					<ThumbDownAltIcon />
				) : (
					<ThumbDownOffAltIcon />
				)}
			</IconButton>
			{answer.dislikes}
		</div>
	);
};

export default LikeDislikeAnswer;
