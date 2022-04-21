import React, { useEffect, useState } from 'react';
import { isAuthenticated } from '../auth/Authentication';
import { useHistory } from 'react-router-dom';
import { AppBar, Button } from '@mui/material';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddTaskIcon from '@mui/icons-material/AddTask';
import UserMenu from './UserMenu';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import IconButton from '@mui/material/IconButton';
const Navbar = (props) => {
	const { setDarkMode, darkMode } = props;
	const history = useHistory();
	const [authenticated, setAuthenticated] = useState(null);

	if (authenticated === null) {
		setAuthenticated(isAuthenticated());
	}

	useEffect(() => {
		history.listen(() => {
			console.log(window.location.pathname);
			setAuthenticated(isAuthenticated());
		});
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const toggleTheme = () => {
		if (darkMode) {
			setDarkMode(false);
		} else {
			setDarkMode(true);
		}
	};

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<Typography variant="h6" component="div" paddingRight={2}>
						<AddTaskIcon />
					</Typography>
					<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
						<Button
							variant="outlined"
							color="inherit"
							onClick={() => history.push('/home')}
						>
							Q & A
						</Button>
					</Typography>
					{authenticated && (
						<Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
							<Button
								variant="contained"
								color="warning"
								onClick={() => history.push('/question')}
							>
								Ask Question
							</Button>
						</Typography>
					)}

					<Typography>
						<IconButton
							sx={{ ml: 1 }}
							onClick={() => toggleTheme()}
							color="inherit"
						>
							{darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
					</Typography>
					{authenticated && <UserMenu />}
				</Toolbar>
			</AppBar>
		</Box>
	);
};

export default Navbar;
