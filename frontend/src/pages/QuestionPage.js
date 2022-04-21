import React, { useState, useEffect, useRef } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { green } from '@mui/material/colors';
import { Container } from '@mui/material';
import moment from 'moment';
import useLocalStorageHook from '../utils/useLocalStorageHook';
import CreateAnswer from '../components/CreateAnswer';
import AnswerCard from '../components/AnswerCard';
import useAnswerAPI from '../utils/useAnswerAPI';
import useAxiosRequest from '../utils/useAxiosRequest';
import LikeDislikeQuestion from '../components/LikeDislikeQuestion';
import { getUserData } from '../auth/Authentication';

export default function QuestionPage() {
	const [question, setQuestion] = useState({});
	const [loading, setLoading] = useState(true);
	const [answers, setAnswers] = useState([]);
	const [questionAuthor, setQuestionAuthor] = useState('');
	const local = useLocalStorageHook();
	const answerAPI = useAnswerAPI();
	const userAPI = useAxiosRequest();
	const initialRender = useRef(true);

	const getQuestionAuthor = async (questionObject) => {
		const data = await userAPI.getUser(questionObject.createdBy);
		setQuestionAuthor(data.user.firstName);
		getAnswers(questionObject._id);
	};

	const getAnswers = async (questionId) => {
		const answers = await answerAPI.getAllAnswers(questionId);
		answers.sort(function (a, b) {
			return new Date(a.createdAt) - new Date(b.createdAt);
		});
		setAnswers([...answers]);
		setLoading(false);
	};

	useEffect(() => {
		const questionObject = local.getCurrentQuestionObject();
		setQuestion(questionObject);
		getQuestionAuthor(questionObject);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	useEffect(() => {
		if (initialRender.current) {
			initialRender.current = false;
		} else {
			local.saveCurrentQuestionObject(question);
			getQuestionAuthor(question);
		}
	}, [question]); // eslint-disable-line react-hooks/exhaustive-deps

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<Container maxWidth="md">
			<Typography variant="h6" align="center">
				Question Page
			</Typography>
			<Card sx={{ maxWidth: 945 }}>
				<CardHeader
					avatar={
						<Avatar sx={{ bgcolor: green[500] }} aria-label="recipe">
							Q
						</Avatar>
					}
					action={<Typography>{questionAuthor}</Typography>}
					title={question.title}
					subheader={moment(new Date(question.createdAt)).format('LLL')}
				/>
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						{question.question}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<LikeDislikeQuestion
						question={question}
						setQuestion={setQuestion}
						userId={getUserData()._id}
					/>
				</CardActions>
			</Card>
			{answers.map((answer, index) => {
				return (
					<div key={index}>
						<AnswerCard
							answer={answer}
							questionId={question._id}
							getAnswers={getAnswers}
							setLoading={setLoading}
						/>
					</div>
				);
			})}

			<CreateAnswer getAnswers={getAnswers} questionId={question._id} />
		</Container>
	);
}
