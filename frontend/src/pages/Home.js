import React from 'react';
import Page from '../components/Page';
import { Grid, Container } from '@mui/material';
import Box from '@mui/material/Box';
import PropTypes from 'prop-types';
import Users from '../components/Users';
import Questions from '../components/Questions';
import Answers from '../components/Answers';

function Item(props) {
	const { sx, ...other } = props;
	return (
		<Box
			sx={{
				bgcolor: 'primary.main',
				color: 'white',
				p: 1,
				m: 1,
				borderRadius: 1,
				textAlign: 'center',
				fontSize: '1rem',
				fontWeight: '700',
				...sx,
			}}
			{...other}
		/>
	);
}

Item.propTypes = {
	sx: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
		PropTypes.func,
		PropTypes.object,
	]),
};

const Home = () => {
	return (
		<Page title="Home | Questions and Answers">
			<Container maxWidth="lg">
				<Box sx={{ flexGrow: 1 }}>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6} md={4}>
							<Questions />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Users />
						</Grid>
						<Grid item xs={12} sm={6} md={4}>
							<Answers />
						</Grid>
					</Grid>
				</Box>
			</Container>
		</Page>
	);
};

export default Home;
