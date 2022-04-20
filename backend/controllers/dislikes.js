const Dislike = require('../models/Dislike');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, NotFoundError } = require('../errors');

const createDislike = async (req, res) => {
	req.body.newDislike.createdBy = req.user.userId;
	const dislike = await Dislike.create(req.body.newDislike);
	res.status(StatusCodes.CREATED).json({ dislike });
};

const getDislike = async (req, res) => {
	const {
		params: { id: questionId },
		user: { userId },
	} = req;
	const dislike = await Dislike.findOne({ questionId, userId });
	res.status(StatusCodes.OK).json({ dislike });
};

const getDislikeAnswer = async (req, res) => {
	const {
		params: { id: answerId },
		user: { userId },
	} = req;
	const dislike = await Dislike.findOne({ answerId, userId });
	res.status(StatusCodes.OK).json({ dislike });
};

const deleteDislike = async (req, res) => {
	const {
		user: { userId },
		params: { id: dislikeId },
	} = req;
	const dislike = await Dislike.findByIdAndRemove({
		_id: dislikeId,
		createdBy: userId,
	});
	if (!dislike) {
		throw new NotFoundError(`No answer found with id ${dislikeId}`);
	}
	res.status(StatusCodes.OK).json({ dislike });
};

module.exports = {
	createDislike,
	getDislike,
	deleteDislike,
	getDislikeAnswer,
};
