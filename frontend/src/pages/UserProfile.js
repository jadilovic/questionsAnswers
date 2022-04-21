import React, { useState, useEffect } from 'react';
import useAxiosRequest from '../utils/useAxiosRequest';
import { getUserData, getUserToken, login } from '../auth/Authentication';
import {
	Box,
	Button,
	Card,
	CardContent,
	CardHeader,
	Divider,
	Grid,
	TextField,
	Container,
} from '@mui/material';
import LoadingPage from '../components/LoadingPage';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
	return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const UserProfile = () => {
	let [userValues, setUserValues] = useState({
		firstName: '',
		lastName: '',
		email: '',
	});
	const [error, setError] = useState('');
	const [fieldErrors, setFieldErrors] = useState({});
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);
	const userAPI = useAxiosRequest();

	const handleSnackbar = () => {
		setOpen(true);
	};

	const handleChange = (event) => {
		setUserValues({
			...userValues,
			[event.target.name]: event.target.value,
		});
	};

	const getUserObject = () => {
		try {
			const editingUserObject = getUserData();
			// Adding empty string to null values
			const propertiesArray = Object.keys(editingUserObject);
			for (let i = 0; i < propertiesArray.length; i++) {
				if (editingUserObject[propertiesArray[i]] === null) {
					editingUserObject[propertiesArray[i]] = '';
				}
			}
			setUserValues({ ...userValues, ...editingUserObject });
			setLoading(false);
		} catch (error) {
			console.log('get user object error: ', error);
		}
	};

	useEffect(() => {
		const user = getUserData();
		setUserValues(user);
		setLoading(false);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const settingErrors = (errors) => {
		let initialErrors = {
			firstName: { error: false, msg: '' },
			lastName: { error: false, msg: '' },
			email: { error: false, msg: '' },
		};
		let errorsList = errors.replace('ValidationError: ', '');
		errorsList = errorsList.split(', ');
		errorsList.map((item) => {
			const errorItem = item.split('-');
			return (initialErrors[errorItem[0]] = {
				error: true,
				msg: errorItem[1],
			});
		});
		setFieldErrors(initialErrors);
		initialErrors = {};
		setError('');
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		// Adding null to empty values
		const propertiesArray = Object.keys(userValues);
		for (let i = 0; i < propertiesArray.length; i++) {
			if (userValues[propertiesArray[i]] === '') {
				userValues[propertiesArray[i]] = null;
			}
		}
		try {
			const editedUser = await userAPI.updateUser(userValues);
			handleSnackbar();
			setFieldErrors({});
			const token = getUserToken();
			login(token, editedUser.user);
			getUserObject();
		} catch (err) {
			try {
				if (err.response.data.msg.startsWith('ValidationError: ')) {
					settingErrors(err.response.data.msg);
				} else {
					setFieldErrors({});
					setError(err.response.data.msg);
				}
			} catch (error) {
				console.log('ERROR : ', error);
				setFieldErrors({});
				setError('Network error. Try again later.');
			}
			for (let i = 0; i < propertiesArray.length; i++) {
				if (userValues[propertiesArray[i]] === null) {
					userValues[propertiesArray[i]] = '';
				}
			}
			setLoading(false);
		}
	};

	if (loading) {
		return <LoadingPage />;
	}

	return (
		<Container maxWidth="md">
			<Box
				sx={{
					flexGrow: 1,
					paddingTop: 9,
					width: '100%',
				}}
			>
				<form autoComplete="off" noValidate onSubmit={handleSubmit}>
					<Card>
						<CardHeader
							//	subheader={`${userValues.firstName} ${userValues.lastName}`}
							title="Profil korisnika"
						/>
						{error && (
							<Box
								sx={{
									paddingTop: 2,
									paddingBottom: 2,
									bgcolor: 'background.paper',
								}}
							>
								<Alert severity="error">{error}</Alert>
							</Box>
						)}
						<Divider />
						<CardContent>
							<Grid container spacing={3}>
								<Grid item md={6} xs={12}>
									<TextField
										error={fieldErrors?.firstName?.error ? true : false}
										helperText={fieldErrors?.firstName?.msg}
										fullWidth
										label="Ime"
										name="firstName"
										onChange={handleChange}
										required
										value={userValues.firstName}
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										error={fieldErrors?.lastName?.error ? true : false}
										helperText={fieldErrors?.lastName?.msg}
										fullWidth
										label="Prezime"
										name="lastName"
										onChange={handleChange}
										required
										value={userValues.lastName}
										variant="outlined"
									/>
								</Grid>
								<Grid item md={6} xs={12}>
									<TextField
										error={fieldErrors?.email?.error ? true : false}
										helperText={fieldErrors?.email?.msg}
										fullWidth
										label="Email"
										name="email"
										onChange={handleChange}
										required
										value={userValues.email}
										variant="outlined"
									/>
								</Grid>
							</Grid>
						</CardContent>
						<Divider />
						<Box
							sx={{
								display: 'flex',
								justifyContent: 'flex-end',
								p: 2,
							}}
						>
							<Button
								sx={{ width: 200 }}
								type="submit"
								color="primary"
								variant="contained"
							>
								Save new data
							</Button>
						</Box>
					</Card>
				</form>
				<CustomizedSnackbars
					open={open}
					setOpen={setOpen}
					handleSnackbar={handleSnackbar}
				/>
			</Box>
		</Container>
	);
};

function CustomizedSnackbars(props) {
	const { open, setOpen } = props;
	const handleClose = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setOpen(false);
	};

	return (
		<Stack spacing={2} sx={{ width: '100%' }}>
			<Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
				<Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
					User data was changed!
				</Alert>
			</Snackbar>
		</Stack>
	);
}

export default UserProfile;
