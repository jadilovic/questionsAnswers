import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Box, Alert, Stack, Grid } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useAnswerAPI from '../utils/useAnswerAPI';
import useAxiosRequest from '../utils/useAxiosRequest';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../utils/useLocalStorageHook';
import { getUserData } from '../auth/Authentication';

export default function AskQuestion(props) {
	const { getAnswers, questionId, setLoading } = props;
	const [errMessage, setErrMessage] = useState('');
	const [newAnswer, setNewAnswer] = useState({ answer: '' });
	const [errors, setErrors] = useState({ answer: '' });
	const answerAPI = useAnswerAPI();
	const userAPI = useAxiosRequest();
	const history = useHistory();
	const local = useLocalStorage();

	const validInput = () => {
		let validInput = true;

		if (newAnswer.answer.length < 5 || newAnswer.answer.length > 500) {
			errors.answer =
				'Answer text must be minimum 5 and maximum 500 characters long';
			validInput = false;
		}

		if (validInput) {
			return true;
		} else {
			setErrors({ ...errors });
			return false;
		}
	};

	const increaseUserAnswers = (data) => {
		data.user.answers++;
		return data.user;
	};

	const createAnswer = async () => {
		try {
			setLoading(true);
			const questionId = local.getCurrentQuestionObject()._id;
			newAnswer.questionId = questionId;
			const data = await answerAPI.createAnswer(newAnswer);
			const currentUser = await userAPI.getUser(getUserData()._id);
			const updatedUser = increaseUserAnswers(currentUser);
			const user = await userAPI.updateUser(updatedUser);
			getAnswers(questionId);
			console.log(data.answer);
			console.log(user.user.answers);
			setNewAnswer({ answer: '' });
		} catch (error) {
			console.log(error.message);
			setErrMessage(error.message);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setErrMessage('');
		console.log(newAnswer);
		if (validInput()) {
			console.log(newAnswer);
			createAnswer();
		} else {
			console.log('Answer did not create');
		}
	};

	const handleChange = (event) => {
		setNewAnswer({ ...newAnswer, [event.target.name]: event.target.value });
		setErrors({ answer: '' });
		setErrMessage('');
	};

	return (
		<>
			<CssBaseline />

			{errMessage && (
				<Stack sx={{ width: '100%' }} spacing={2}>
					<Alert severity="error">{errMessage}</Alert>
				</Stack>
			)}

			<Box component="form" onSubmit={handleSubmit} noValidate>
				<TextField
					margin="normal"
					required
					fullWidth
					id="answer"
					label="Answer"
					name="answer"
					value={newAnswer.answer}
					onChange={handleChange}
					error={errors.answer ? true : false}
					helperText={errors.answer}
				/>
				<Button type="submit" variant="contained" sx={{ mb: 2 }}>
					Submit Answer
				</Button>
			</Box>
		</>
	);
}
