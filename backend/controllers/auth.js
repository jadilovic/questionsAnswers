const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const signup = async (req, res) => {
	await User.create({ ...req.body });
	const user = await User.findOne(
		{ email: req.body.email },
		{ _id: 1, email: 1, firstName: 1, lastName: 1, answers: 1 }
	);
	const token = user.createJWT();
	res.status(StatusCodes.CREATED).json({ user, token });
};

const login = async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		throw new BadRequestError('Please provide name and password');
	}
	const user = await User.findOne({ email });
	if (!user) {
		throw new UnauthenticatedError('User email is not valid');
	}
	const isPasswordCorrect = await user.comparePasswords(password);

	if (!isPasswordCorrect) {
		throw new UnauthenticatedError('Invalid credetials');
	}
	const token = user.createJWT();
	user.password = undefined;
	res.status(StatusCodes.CREATED).json({ user, token });
};

module.exports = { signup, login };
