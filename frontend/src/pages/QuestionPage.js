import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { green, red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Container } from '@mui/material';
import useLocalStorageHook from '../utils/useLocalStorageHook';
import CreateAnswer from '../components/CreateAnswer';
import AnswerCard from '../components/AnswerCard';
import useAnswerAPI from '../utils/useAnswerAPI';
import useAxiosRequest from '../utils/useAxiosRequest';

export default function QuestionPage() {
	const [question, setQuestion] = useState({});
	const [loading, setLoading] = useState(true);
	const [answers, setAnswers] = useState([]);
	const [questionAuthor, setQuestionAuthor] = useState('');
	const local = useLocalStorageHook();
	const answerAPI = useAnswerAPI();
	const userAPI = useAxiosRequest();

	const getQuestionAuthor = async (questionObject) => {
		console.log('user id : ', questionObject.createdBy);
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
	}, []);

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
					subheader={new Date(question.createdAt).toString()}
				/>
				<CardContent>
					<Typography variant="body2" color="text.secondary">
						{question.question}
					</Typography>
				</CardContent>
				<CardActions disableSpacing>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>
					<IconButton aria-label="add to favorites">
						<FavoriteIcon />
					</IconButton>
					<IconButton aria-label="share">
						<ShareIcon />
					</IconButton>
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

			<CreateAnswer
				getAnswers={getAnswers}
				questionId={question._id}
				setLoading={setLoading}
			/>
		</Container>
	);
}
