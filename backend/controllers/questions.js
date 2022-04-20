const Question = require('../models/Question');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const getAllQuestions = async (req, res) => {
	const id = req.params;
	const questions = await Question.find({}).sort({
		createdAt: -1,
	});
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

/*
const getTask = async (req, res) => {
	const {
		user: { userId },
		params: { id: taskId },
	} = req;
	const task = await Task.findOne(
		{ _id: taskId, createdBy: userId },
		{
			currentStatus: 1,
			name: 1,
			description: 1,
			updatedAt: 1,
			avatarIcon: 1,
			avatarColor: 1,
		}
	);
	if (!task) {
		throw new NotFoundError(`No task found with id ${taskId}`);
	}
	res.status(StatusCodes.OK).json({ task });
};

const deleteTask = async (req, res) => {
	const {
		user: { userId },
		params: { id: taskId },
	} = req;
	const task = await Task.findByIdAndRemove({ _id: taskId, createdBy: userId });
	if (!task) {
		throw new NotFoundError(`No task found with id ${taskId}`);
	}
	res.status(StatusCodes.OK).json({ task });
};

const createTaskStatus = async (req, res) => {
	const taskStatus = await TaskStatus.create(req.body);
	res.status(StatusCodes.CREATED).json({ taskStatus });
};

const getAllStatuses = async (req, res) => {
	const statuses = await TaskStatus.find({});
	res.status(StatusCodes.OK).json({ statuses, length: statuses.length });
};

// POST REQUEST FOR FILTERING
const filterTasksByAvatarIconAndColor = async (req, res) => {
	let {
		user: { userId },
		body: { iconFilters, statusFilters },
	} = req;
	// new variables
	iconFilters = iconFilters.map((iconName) => {
		return { ['avatarIcon']: iconName };
	});
	statusFilters = statusFilters.map((statusId) => {
		return { ['currentStatus']: statusId };
	});
	const filteredTasks = await Task.find(
		{
			$and: [
				{
					$or: iconFilters.length > 0 ? iconFilters : [{}],
				},
				{
					$or: statusFilters.length > 0 ? statusFilters : [{}],
				},
			],
			createdBy: userId,
		},
		{
			currentStatus: 1,
			name: 1,
			description: 1,
			updatedAt: 1,
			createdAt: 1,
			avatarIcon: 1,
			avatarColor: 1,
		}
	);
	if (!filteredTasks) {
		throw new NotFoundError(`No task found with given filters`);
	}
	res.status(StatusCodes.OK).json({ filteredTasks });
};
*/
module.exports = {
	getAllQuestions,
	createQuestion,
	updateQuestion,
	// getTask,
	// deleteTask,
	// createTaskStatus,
	// getAllStatuses,
	// filterTasksByAvatarIconAndColor,
};
