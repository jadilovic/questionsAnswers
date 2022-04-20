const Like = require('../models/Like');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const createLike = async (req, res) => {
	req.body.newLike.createdBy = req.user.userId;
	const like = await Like.create(req.body.newLike);
	res.status(StatusCodes.CREATED).json({ like });
};

const getLike = async (req, res) => {
	const {
		params: { id: questionId },
		user: { userId },
	} = req;
	const like = await Like.findOne({ questionId, userId });
	res.status(StatusCodes.OK).json({ like });
};

const getLikeAnswer = async (req, res) => {
	const {
		params: { id: answerId },
		user: { userId },
	} = req;
	const like = await Like.findOne({ answerId, userId });
	res.status(StatusCodes.OK).json({ like });
};

const deleteLike = async (req, res) => {
	const {
		user: { userId },
		params: { id: likeId },
	} = req;
	const like = await Like.findByIdAndRemove({
		_id: likeId,
		createdBy: userId,
	});
	if (!like) {
		throw new NotFoundError(`No answer found with id ${likeId}`);
	}
	res.status(StatusCodes.OK).json({ like });
};

module.exports = {
	createLike,
	getLike,
	deleteLike,
	getLikeAnswer,
};
