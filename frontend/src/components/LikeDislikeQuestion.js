import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';
import useLikeAPI from '../utils/useLikeAPI';
import useQuestionAPI from '../utils/useQuestionAPI';
import useDislikeAPI from '../utils/useDislikeAPI';

const LikeDislikeQuestion = (props) => {
	const { userId, setQuestion } = props;
	const [likeObject, setLikeObject] = useState({});
	const [dislikeObject, setDislikeObject] = useState({});
	const [countLikes, setCountLikes] = useState(0);
	const [countDislikes, setCountDislikes] = useState(0);
	const [likeStatus, setLikeStatus] = useState(false);
	const [dislikeStatus, setDislikeStatus] = useState(false);
	const likeAPI = useLikeAPI();
	const questionAPI = useQuestionAPI();
	const dislikeAPI = useDislikeAPI();
	let variable = {};
	if (props.question) {
		variable = { questionId: props.question._id, userId };
	} else {
		variable = { answerId: props.answer.answerId, userId };
	}

	const getQuestionLikeStatus = async () => {
		const data = await likeAPI.getLike(variable.questionId);
		setLikeObject({ ...data.like });
		setCountLikes(props.question.likes);
		if (data.like) {
			setLikeStatus(true);
			setCountLikes(props.question.likes);
		} else {
			setLikeStatus(false);
		}
	};

	const getQuestionDislikeStatus = async () => {
		const data = await dislikeAPI.getDislike(variable.questionId);
		setLikeObject({ ...data.dislike });
		setCountDislikes(props.question.dislikes);
		console.log('props question : ', props.question);
		if (data.dislike) {
			setDislikeStatus(true);
			setCountDislikes(props.question.dislikes);
		} else {
			setDislikeStatus(false);
		}
	};

	useEffect(() => {
		if (props.question) {
			getQuestionLikeStatus();
			getQuestionDislikeStatus();
		} else {
		}
	}, []);

	const createLike = async () => {
		if (dislikeStatus) {
			deleteDislike();
			setDislikeStatus(false);
		}
		const data = await likeAPI.createLike(variable);
		console.log('created like : ', data.like);
		const question = props.question;
		question.likes = ++question.likes;
		setCountLikes(question.likes);
		console.log(question);
		const updatedQuestion = await questionAPI.updateQuestion(question);
		setQuestion({ ...updatedQuestion.question });
		setLikeObject({ ...data.like });
	};

	const deleteLike = async () => {
		console.log('to delete like : ', likeObject);
		await likeAPI.deleteLike(likeObject._id);
		const question = props.question;
		question.likes = --question.likes;
		setCountLikes(question.likes);
		console.log(question);
		const updatedQuestion = await questionAPI.updateQuestion(question);
		setQuestion({ ...updatedQuestion.question });
		console.log('updated question : ', updatedQuestion.question);
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
		const question = props.question;
		question.dislikes = ++question.dislikes;
		setCountDislikes(question.dislikes);
		console.log(question);
		const updatedQuestion = await questionAPI.updateQuestion(question);
		setQuestion(updatedQuestion.question);
		setDislikeObject({ ...data.dislike });
	};

	const deleteDislike = async () => {
		console.log('to delete dislike : ', dislikeObject);
		await dislikeAPI.deleteDislike(dislikeObject._id);
		const question = props.question;
		question.dislikes = --question.dislikes;
		setCountDislikes(question.dislikes);
		console.log(question);
		const updatedQuestion = await questionAPI.updateQuestion(question);
		setQuestion(updatedQuestion.question);
		console.log('updated question : ', updatedQuestion.question);
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

export default LikeDislikeQuestion;
