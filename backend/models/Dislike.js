const mongoose = require('mongoose');

const dislikeSchema = new mongoose.Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User' },
		questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
		answerId: { type: Schema.Types.ObjectId, ref: 'Answer' },
	},
	{ timestamps: true }
);

const Dislike = mongoose.model('Dislike', dislikeSchema);

module.exports = { Dislike };
