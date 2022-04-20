const mongoose = require('mongoose');

const dislikeSchema = new mongoose.Schema(
	{
		userId: { type: mongoose.Types.ObjectId, ref: 'User' },
		questionId: { type: mongoose.Types.ObjectId, ref: 'Question' },
		answerId: { type: mongoose.Types.ObjectId, ref: 'Answer' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Dislike', dislikeSchema);
