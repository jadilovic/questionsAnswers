import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Error from './pages/Error';
import EditAnswer from './pages/EditAnswer';
import MyQuestions from './pages/MyQuestions';
import UserProfile from './pages/UserProfile';
import PrivateRoute from './components/PrivateRoute';
import Navbar from './components/Navbar';
import AskQuestion from './pages/AskQuestion';
import QuestionPage from './pages/QuestionPage';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ScrollToTop from './utils/ScrollToTop';

const App = () => {
	const [darkMode, setDarkMode] = useState(true);
	const theme = createTheme({
		palette: {
			mode: `${darkMode ? 'dark' : 'light'}`,
			primary: {
				main: `${darkMode ? '#575761' : '#648381'}`,
			},
			secondary: {
				main: `${darkMode ? '#575761' : '#FFBF46'}`,
			},
		},
	});

	return (
		<ThemeProvider theme={theme}>
			<Router>
				<CssBaseline />
				<ScrollToTop />
				<Navbar setDarkMode={setDarkMode} darkMode={darkMode} />
				<Switch>
					<Route component={Login} path="/" exact />
					<Route component={Signup} path="/signup" exact />
					<PrivateRoute component={Home} path="/home" exact />
					<PrivateRoute component={AskQuestion} path="/question" exact />
					<PrivateRoute component={QuestionPage} path="/question-page" exact />
					<PrivateRoute component={EditAnswer} path="/edit-answer" exact />
					<PrivateRoute component={MyQuestions} path="/my-questions" exact />
					<PrivateRoute component={UserProfile} path="/user-profile" exact />
					<Route component={Error} path="/*" />
				</Switch>
			</Router>
		</ThemeProvider>
	);
};

export default App;
