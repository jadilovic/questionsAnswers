const Answer = require('../models/Answer');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllAnswers = async (req, res) => {
	console.log(req.params.id);
	const answers = await Answer.find({ questionId: req.params.id }).sort({
		createdAt: -1,
	});
	res.status(StatusCodes.OK).json({ answers, length: answers.length });
};

const createAnswer = async (req, res) => {
	req.body.newAnswer.createdBy = req.user.userId;
	const answer = await Answer.create(req.body.newAnswer);
	res.status(StatusCodes.CREATED).json({ answer });
};

const getAnswer = async (req, res) => {
	const {
		params: { id: answerId },
	} = req;
	const answer = await Answer.findOne({ answerId });
	res.status(StatusCodes.OK).json({ answer });
};

const deleteAnswer = async (req, res) => {
	const {
		user: { userId },
		params: { id: answerId },
	} = req;
	const answer = await Answer.findByIdAndRemove({
		_id: answerId,
		createdBy: userId,
	});
	if (!answer) {
		throw new NotFoundError(`No answer found with id ${answerId}`);
	}
	res.status(StatusCodes.OK).json({ answer });
};

const updateAnswer = async (req, res) => {
	const {
		user: { userId },
		params: { id: answerId },
	} = req;

	const answer = await Answer.findByIdAndUpdate(
		{ _id: answerId, createdBy: userId },
		req.body,
		{ new: true, runValidators: true }
	);
	res.status(StatusCodes.OK).json({ answer });
};

module.exports = {
	getAllAnswers,
	createAnswer,
	updateAnswer,
	deleteAnswer,
	getAnswer,
};
