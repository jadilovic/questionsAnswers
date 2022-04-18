const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const getAllUsers = async (req, res) => {
	const users = await User.find({});
	res.status(StatusCodes.OK).json({ users, length: users.length });
};

const getUser = async (req, res) => {
	const {
		params: { id: userId },
	} = req;
	const user = await User.findOne(
		{ _id: userId },
		{
			firstName: 1,
			lastName: 1,
			email: 1,
			answers: 1,
		}
	);
	if (!user) {
		throw new NotFoundError(`No user found with id ${userId}`);
	}
	res.status(StatusCodes.OK).json({ user });
};

const emailExists = async (enteredEmail, userId) => {
	const userObject = await User.find({ _id: userId }).findOne({
		email: enteredEmail,
	});
	if (userObject) {
		return userObject._id.toString() === userId ? false : true;
	} else {
		return false;
	}
};

const updateUser = async (req, res) => {
	const {
		body: { email },
		user: { userId },
	} = req;
	if (email === '') {
		throw new BadRequestError('Must provide email value');
	}

	console.log('user body: ', req.body);
	const existingUser = await emailExists(email, userId);
	if (existingUser) {
		throw new BadRequestError(
			'Entered email already exists. Please enter different email name.'
		);
	}

	const user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
		new: true,
		runValidators: true,
	});
	if (!user) {
		throw new NotFoundError(`User with id ${userId} was not found`);
	}
	res.status(StatusCodes.OK).json({ user });
};

module.exports = { updateUser, getAllUsers, getUser };
