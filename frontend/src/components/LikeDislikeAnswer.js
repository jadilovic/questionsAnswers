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
	const { userId, getAnswers } = props;
	const [likeObject, setLikeObject] = useState({});
	const [dislikeObject, setDislikeObject] = useState({});
	const [countLikes, setCountLikes] = useState(0);
	const [countDislikes, setCountDislikes] = useState(0);
	const [likeStatus, setLikeStatus] = useState(false);
	const [dislikeStatus, setDislikeStatus] = useState(false);
	const likeAPI = useLikeAPI();
	const answerAPI = useAnswerAPI();
	const dislikeAPI = useDislikeAPI();
	const local = useLocalStorageHook();
	let variable = {};
	if (props.answer) {
		variable = { answerId: props.answer._id, userId };
	} else {
		variable = { questionId: props.question._id, userId };
	}

	const getAnswerLikeStatus = async () => {
		const data = await likeAPI.getLikeAnswer(variable.answerId);
		setLikeObject({ ...data.like });
		setCountLikes(props.answer.likes);
		if (data.like) {
			setLikeStatus(true);
			setCountLikes(props.answer.likes);
		} else {
			setLikeStatus(false);
		}
	};

	const getAnswerDislikeStatus = async () => {
		const data = await dislikeAPI.getDislikeAnswer(variable.answerId);
		setLikeObject({ ...data.dislike });
		setCountDislikes(props.answer.dislikes);
		if (data.dislike) {
			setDislikeStatus(true);
			setCountDislikes(props.answer.dislikes);
		} else {
			setDislikeStatus(false);
		}
	};

	useEffect(() => {
		if (props.answer) {
			getAnswerLikeStatus();
			getAnswerDislikeStatus();
		} else {
		}
	}, []);

	const createLike = async () => {
		if (dislikeStatus) {
			deleteDislike();
			setDislikeStatus(false);
		}
		const data = await likeAPI.createLike(variable);
		const answer = props.answer;
		answer.likes = ++answer.likes;
		setCountLikes(answer.likes);
		const updatedAnswer = await answerAPI.updateAnswer(answer);
		const questionObject = local.getCurrentQuestionObject();
		getAnswers(questionObject._id);
		setLikeObject({ ...data.like });
	};

	const deleteLike = async () => {
		await likeAPI.deleteLike(likeObject._id);
		const answer = props.answer;
		console.log('answer : ', answer);
		answer.likes = --answer.likes;
		setCountLikes(answer.likes);
		console.log(answer);
		const updatedAnswer = await answerAPI.updateAnswer(answer);
		const questionObject = local.getCurrentQuestionObject();
		getAnswers(questionObject._id);
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
		const data = await dislikeAPI.createDislike(variable);
		console.log('created dislike : ', data.dislike);
		const answer = props.answer;
		answer.dislikes = ++answer.dislikes;
		setCountDislikes(answer.dislikes);
		console.log(answer);
		const updatedAnswer = await answerAPI.updateAnswer(answer);
		const questionObject = local.getCurrentQuestionObject();
		getAnswers(questionObject._id);
		setDislikeObject({ ...data.dislike });
	};

	const deleteDislike = async () => {
		console.log('to delete dislike : ', dislikeObject);
		await dislikeAPI.deleteDislike(dislikeObject._id);
		const answer = props.answer;
		answer.dislikes = --answer.dislikes;
		setCountDislikes(answer.dislikes);
		const updatedAnswer = await answerAPI.updateAnswer(answer);
		const questionObject = local.getCurrentQuestionObject();
		getAnswers(questionObject._id);
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
