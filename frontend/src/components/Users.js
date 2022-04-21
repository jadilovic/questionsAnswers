import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Typography } from '@mui/material';
import useAxiosRequest from '../utils/useAxiosRequest';

export default function Users() {
	const [users, setUsers] = useState([]);
	const [loading, setLoading] = useState(true);
	const userAPI = useAxiosRequest();

	const getUsers = async () => {
		try {
			const data = await userAPI.getAllUsers();
			data.sort(function (a, b) {
				return new Date(b.answers) - new Date(a.answers);
			});
			setUsers([...data]);
			setLoading(false);
		} catch (error) {
			console.log(error.message);
		}
	};

	useEffect(() => {
		getUsers();
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	if (loading) {
		return <h1>Loading...</h1>;
	}

	return (
		<>
			<Typography style={{ margin: 10 }} variant="h6" align="center">
				Users
			</Typography>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 65 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell align="left">Name</TableCell>
							<TableCell align="right">Answers</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{users.map((row, index) => (
							<TableRow
								key={index}
								sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
							>
								<TableCell align="left">{row.firstName}</TableCell>
								<TableCell align="right">{row.answers}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
