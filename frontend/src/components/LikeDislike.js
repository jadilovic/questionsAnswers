import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

const LikeDislike = (props) => {
	const [likeStatus, setLikeStatus] = useState(false);
	const [loading, setLoading] = useState(true);
	let variable = {};
	if (props.question) {
		variable = { questionId: props.questionId, userId: props.userId };
	} else {
		variable = { answerId: props.answerId, userId: props.userId };
	}

	const getQuestionLikeStatus = async () => {};

	useEffect(() => {
		if (props.question) {
			getQuestionLikeStatus();
		} else {
		}
	}, []);

	if (loading) {
		<h1>Loading...</h1>;
	}

	return (
		<div>
			<IconButton aria-label="add to favorites">
				<ThumbUpAltIcon />
				<ThumbUpOffAltIcon />
				<Typography>1</Typography>
			</IconButton>
			<IconButton aria-label="share">
				<ThumbDownAltIcon />
				<ThumbDownOffAltIcon />
				<Typography>1</Typography>
			</IconButton>
		</div>
	);
};

export default LikeDislike;
