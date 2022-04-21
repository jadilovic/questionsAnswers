import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Container, Paper } from '@mui/material';
import useQuestionAPI from '../utils/useQuestionAPI';
import { Typography } from '@mui/material';
import useLocalStorageHook from '../utils/useLocalStorageHook';
import { useHistory } from 'react-router-dom';
import moment from 'moment';
import { getUserData } from '../auth/Authentication';

export default function Questions() {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const questionAPI = useQuestionAPI();
	const local = useLocalStorageHook();
	const history = useHistory();

	const getQuestions = async () => {
		try {
			const data = await questionAPI.getAllQuestions(getUserData()._id);
			console.log(data);
			setQuestions([...data]);
			setLoading(false);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getQuestions();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleQuestion = (questionObject) => {
		local.saveCurrentQuestionObject(questionObject);
		history.push('/question-page');
	};

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<Container maxWidth="lg">
			<Typography style={{ margin: 10 }} variant="h6" align="center">
				My Questions
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 65 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="left">Title</TableCell>
							<TableCell align="left">Created</TableCell>
							<TableCell align="right">Likes</TableCell>
							<TableCell align="right">Dislikes</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{questions.map((row, index) => (
							<TableRow
								key={index}
								onClick={() => handleQuestion(row)}
								style={{ cursor: 'pointer' }}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell align="left" component="th" scope="row">
									{row.title}
								</TableCell>
								<TableCell align="left" component="th" scope="row">
									{moment(new Date(row.createdAt)).format('LLL')}
								</TableCell>
								<TableCell align="right" component="th" scope="row">
									{row.likes}
								</TableCell>
								<TableCell align="right" component="th" scope="row">
									{row.dislikes}
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</Container>
	);
}
