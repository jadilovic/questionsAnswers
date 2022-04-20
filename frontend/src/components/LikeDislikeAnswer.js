import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import useLikeAPI from '../utils/useLikeAPI';
import useAnswerAPI from '../utils/useAnswerAPI';
import useDislikeAPI from '../utils/useDislikeAPI';
import useLocalStorageHook from '../utils/useLocalStorageHook';

const LikeDislikeAnswer = (props) => {
	const { userId, answerId } = props;
	const [likeObject, setLikeObject] = useState({});
	const [dislikeObject, setDislikeObject] = useState({});
	const [countLikes, setCountLikes] = useState(0);
	const [countDislikes, setCountDislikes] = useState(0);
	const [likeStatus, setLikeStatus] = useState(false);
	const [dislikeStatus, setDislikeStatus] = useState(false);
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
		setCountLikes(answer.likes);
		if (data.like) {
			setLikeStatus(true);
			setCountLikes(answer.likes);
		} else {
			setLikeStatus(false);
		}
		getAnswerDislikeStatus();
	};

	const getAnswerDislikeStatus = async () => {
		const data = await dislikeAPI.getDislikeAnswer(answerId);
		setLikeObject({ ...data.dislike });
		setCountDislikes(answer.dislikes);
		if (data.dislike) {
			setDislikeStatus(true);
			setCountDislikes(answer.dislikes);
		} else {
			setDislikeStatus(false);
		}
	};

	useEffect(() => {
		getAnswer();
	}, []);

	const createLike = async () => {
		if (dislikeStatus) {
			deleteDislike();
			setDislikeStatus(false);
		}
		const data = await likeAPI.createLike({ answerId, userId });
		answer.likes = ++answer.likes;
		setCountLikes(answer.likes);
		const updatedAnswer = await answerAPI.updateAnswer(answer);
		setAnswer({ ...answer });
		setLikeObject({ ...data.like });
	};

	const deleteLike = async () => {
		await likeAPI.deleteLike(likeObject._id);
		answer.likes = --answer.likes;
		setCountLikes(answer.likes);
		const updatedAnswer = await answerAPI.updateAnswer(answer);
		setAnswer({ ...answer });
		setLikeObject({});
	};

	const handleThumbUp = () => {
		if (!likeStatus) {
			setLikeStatus(!likeStatus);
			createLike();
		} else {
			setLikeStatus(!likeStatus);
			deleteLike();
		}
	};

	const createDislike = async () => {
		if (likeStatus) {
			deleteLike();
			setLikeStatus(false);
		}
		const data = await dislikeAPI.createDislike({ answerId, userId });
		answer.dislikes = ++answer.dislikes;
		setCountDislikes(answer.dislikes);
		const updatedAnswer = await answerAPI.updateAnswer(answer);
		setAnswer({ ...answer });
		setDislikeObject({ ...data.dislike });
	};

	const deleteDislike = async () => {
		await dislikeAPI.deleteDislike(dislikeObject._id);
		answer.dislikes = --answer.dislikes;
		setCountDislikes(answer.dislikes);
		const updatedAnswer = await answerAPI.updateAnswer(answer);
		setAnswer({ ...answer });
		setDislikeObject({});
	};

	const handleThumbDown = () => {
		if (!dislikeStatus) {
			setDislikeStatus(!dislikeStatus);
			createDislike();
		} else {
			setDislikeStatus(!dislikeStatus);
			deleteDislike();
		}
	};

	return (
		<div>
			<IconButton onClick={handleThumbUp}>
				{likeStatus ? <ThumbUpAltIcon /> : <ThumbUpOffAltIcon />}
			</IconButton>
			{countLikes}{' '}
			<IconButton onClick={handleThumbDown}>
				{dislikeStatus ? <ThumbDownAltIcon /> : <ThumbDownOffAltIcon />}
			</IconButton>
			{countDislikes}
		</div>
	);
};

export default LikeDislikeAnswer;
