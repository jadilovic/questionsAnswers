import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import useQuestionAPI from '../utils/useQuestionAPI';

const HotQuestions = () => {
	const [questions, setQuestions] = useState([]);
	const [loading, setLoading] = useState(true);
	const questionAPI = useQuestionAPI();

	const getQuestions = async () => {
		try {
			const data = await questionAPI.getAllQuestions();
			data.sort(function (a, b) {
				return new Date(b.likes) - new Date(a.likes);
			});
			setQuestions([...data]);
			setLoading(false);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getQuestions();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (loading) {
		return <h1>Loading...</h1>;
	}
	return (
		<>
			<Typography style={{ margin: 10 }} variant="h6" align="center">
				Hot Questions
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 65 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="left">Title</TableCell>
							<TableCell align="right">Likes</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{questions.map((row, index) => (
							<TableRow
								key={index}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell align="left">{row.title}</TableCell>
								<TableCell align="right"> {row.likes}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
};

export default HotQuestions;
