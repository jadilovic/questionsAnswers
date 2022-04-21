import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import useAnswerAPI from '../utils/useAnswerAPI';
import useAxiosRequest from '../utils/useAxiosRequest';
import { getUserData } from '../auth/Authentication';
import LikeDislikeAnswer from './LikeDislikeAnswer';

export default function AnswerCard(props) {
	const { answer, questionId, getAnswers, setLoading } = props;
	const [loadingAuthor, setLoadingAuthor] = useState(true);
	const [authorName, setAuthorName] = useState('');
	const answerAPI = useAnswerAPI();
	const userAPI = useAxiosRequest();

	const decreaseUserAnswers = (data) => {
		data.user.answers--;
		return data.user;
	};

	const handleDelete = async (answerId) => {
		setLoading(true);
		await answerAPI.deleteAnswer(answerId);
		const currentUser = await userAPI.getUser(getUserData()._id);
		const updatedUser = decreaseUserAnswers(currentUser);
		const user = await userAPI.updateUser(updatedUser);
		getAnswers(questionId);
		console.log(user);
	};

	const getAnswerAuthor = async (userId) => {
		const data = await userAPI.getUser(userId);
		setAuthorName(data.user.firstName);
		setLoadingAuthor(false);
	};

	useEffect(() => {
		getAnswerAuthor(answer.createdBy);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (loadingAuthor) {
		return <h1>Loading...</h1>;
	}
	return (
		<Card sx={{ marginLeft: 5, marginTop: 1, maxWidth: 945 }}>
			<CardHeader
				avatar={
					<Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
						A
					</Avatar>
				}
				action={
					<>
						{answer.createdBy === getUserData()._id && (
							<>
								<IconButton aria-label="settings">
									<EditIcon color="warning" />
								</IconButton>
								<IconButton
									onClick={() => handleDelete(answer._id)}
									color="error"
									aria-label="settings"
								>
									<DeleteIcon />
								</IconButton>
							</>
						)}
					</>
				}
				title={authorName}
				subheader={new Date(answer.createdAt).toString()}
			/>
			<CardContent>
				<Typography variant="body2" color="text.secondary">
					{answer.answer}
				</Typography>
			</CardContent>
			<CardActions disableSpacing>
				<LikeDislikeAnswer answerId={answer._id} userId={getUserData()._id} />
			</CardActions>
		</Card>
	);
}
