require('dotenv').config();
require('express-async-errors');
const express = require('express');
const app = express();
// path needed for heroku
const path = require('path');
const cors = require('cors');

// connect DB
const connectDB = require('./db/connect');

//added for heroku
app.use(express.static(path.join(__dirname, '../frontend/build')));

// routes
const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const questionsRouter = require('./routes/questions');
const answersRouter = require('./routes/answers');
const likesRouter = require('./routes/likes');
const dislikesRouter = require('./routes/dislikes');

// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');
const authenticateUser = require('./middleware/authentication');

app.use(express.json());
app.use(cors());

// routes
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', authenticateUser, usersRouter);
app.use('/api/v1/questions', authenticateUser, questionsRouter);
app.use('/api/v1/answers', authenticateUser, answersRouter);
app.use('/api/v1/likes', authenticateUser, likesRouter);
app.use('/api/v1/dislikes', authenticateUser, dislikesRouter);

// added for heroku
app.get('/*', (req, res) => {
	res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
});

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
	try {
		await connectDB(process.env.MONGO_URI);
		app.listen(port, console.log(`Server is listening on port ${port}...`));
	} catch (error) {
		console.log(error);
	}
};

start();
