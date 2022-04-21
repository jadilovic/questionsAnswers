import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { logout, getUserData } from '../auth/Authentication';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Menu } from '@mui/material';

const UserMenu = () => {
	const [anchorEl, setAnchorEl] = useState(null);
	const history = useHistory();

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const handleLogout = (e) => {
		e.preventDefault();
		logout();
		history.push('/');
	};

	const handleMyQuestions = (e) => {
		e.preventDefault();
		setAnchorEl(null);
		history.push('/my-questions');
	};

	const handleUserProfile = (e) => {
		e.preventDefault();
		setAnchorEl(null);
		history.push('/user-profile');
	};

	return (
		<div style={{ margin: 0 }}>
			<IconButton
				size="large"
				aria-label="account of current user"
				aria-controls="menu-appbar"
				aria-haspopup="true"
				onClick={handleMenu}
				color="inherit"
			>
				<AccountCircle />
			</IconButton>
			<Menu
				id="menu-appbar"
				anchorEl={anchorEl}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				keepMounted
				transformOrigin={{
					vertical: 'top',
					horizontal: 'right',
				}}
				open={Boolean(anchorEl)}
				onClose={handleClose}
			>
				<MenuItem style={{ pointerEvents: 'none' }}>
					<Typography component="div" paddingRight={2}>
						{`${getUserData()?.firstName} ${getUserData()?.lastName}`}
					</Typography>
				</MenuItem>
				<MenuItem style={{ pointerEvents: 'none' }}>
					<Typography component="div" paddingRight={2}>
						{`${getUserData()?.email}`}
					</Typography>
				</MenuItem>
				<Typography margin={2} align="center">
					<Button variant="contained" color="info" onClick={handleMyQuestions}>
						My Questions
					</Button>
				</Typography>
				<Typography margin={2} align="center">
					<Button
						style={{ minWidth: 142 }}
						variant="contained"
						color="success"
						onClick={handleUserProfile}
					>
						Profile
					</Button>
				</Typography>
				<Typography align="center">
					<Button
						style={{ minWidth: 142 }}
						variant="contained"
						color="error"
						onClick={handleLogout}
					>
						Logout
					</Button>
				</Typography>
			</Menu>
		</div>
	);
};

export default UserMenu;
