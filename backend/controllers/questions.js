const Question = require('../models/Question');
const { StatusCodes } = require('http-status-codes');

const getAllQuestions = async (req, res) => {
	const id = req.params.id;
	let questions = [];
	if (id === 'undefined') {
		questions = await Question.find({}).sort({
			createdAt: -1,
		});
	} else {
		questions = await Question.find({ createdBy: id }).sort({
			createdAt: -1,
		});
	}

	res.status(StatusCodes.OK).json({ questions, length: questions.length });
};

const createQuestion = async (req, res) => {
	req.body.newQuestion.createdBy = req.user.userId;
	const question = await Question.create(req.body.newQuestion);
	res.status(StatusCodes.CREATED).json({ question });
};

const updateQuestion = async (req, res) => {
	const {
		user: { userId },
		params: { id: questionId },
	} = req;

	const question = await Question.findByIdAndUpdate(
		{ _id: questionId, createdBy: userId },
		req.body,
		{ new: true, runValidators: true }
	);
	res.status(StatusCodes.OK).json({ question });
};

module.exports = {
	getAllQuestions,
	createQuestion,
	updateQuestion,
};
