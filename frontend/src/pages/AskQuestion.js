import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import { Box, Alert, Stack } from '@mui/material';
import QuizIcon from '@mui/icons-material/Quiz';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useQuestionAPI from '../utils/useQuestionAPI';
import { useHistory } from 'react-router-dom';
import useLocalStorage from '../utils/useLocalStorageHook';

export default function AskQuestion() {
	const [errMessage, setErrMessage] = useState('');
	const [newQuestion, setNewQuestion] = useState({ title: '', question: '' });
	const [errors, setErrors] = useState({ title: '', question: '' });
	const questionAPI = useQuestionAPI();
	const history = useHistory();
	const local = useLocalStorage();

	const validInput = () => {
		let validInput = true;
		if (newQuestion.title.length < 5 || newQuestion.title.length > 50) {
			errors.title =
				'Question title must be minimum 5 and maximum 50 characters long';
			validInput = false;
		}

		if (newQuestion.question.length < 5 || newQuestion.question.length > 500) {
			errors.question =
				'Question text must be minimum 5 and maximum 500 characters long';
			validInput = false;
		}

		if (validInput) {
			return true;
		} else {
			setErrors({ ...errors });
			return false;
		}
	};

	const createQuestion = async () => {
		try {
			const data = await questionAPI.createQuestion(newQuestion);
			local.saveCurrentQuestionObject(data.question);
			history.push('/question-page');
		} catch (error) {
			console.log(error.message);
			setErrMessage(error.message);
		}
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		setErrMessage('');
		if (validInput()) {
			createQuestion();
		} else {
			console.log('Question did not create');
		}
	};

	const handleChange = (event) => {
		setNewQuestion({ ...newQuestion, [event.target.name]: event.target.value });
		setErrors({ title: '', question: '' });
		setErrMessage('');
	};

	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<Box
				sx={{
					marginTop: 8,
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
				}}
			>
				<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
					<QuizIcon />
				</Avatar>
				<Typography component="h1" variant="h5">
					Ask Question
				</Typography>
				{errMessage && (
					<Stack sx={{ width: '100%' }} spacing={2}>
						<Alert severity="error">{errMessage}</Alert>
					</Stack>
				)}

				<Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
					<TextField
						margin="normal"
						required
						fullWidth
						id="title"
						label="Title"
						name="title"
						value={newQuestion.title}
						onChange={handleChange}
						error={errors.title ? true : false}
						helperText={errors.title}
						autoFocus
					/>
					<TextField
						multiline
						maxRows={5}
						required
						fullWidth
						name="question"
						value={newQuestion.question}
						onChange={handleChange}
						label="Question"
						type="text"
						id="question"
						error={errors.question ? true : false}
						helperText={errors.question}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						sx={{ mt: 3, mb: 2 }}
					>
						Create Question
					</Button>
				</Box>
			</Box>
		</Container>
	);
}
