const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
	{
		userId: { type: Schema.Types.ObjectId, ref: 'User' },
		questionId: { type: Schema.Types.ObjectId, ref: 'Question' },
		answerId: { type: Schema.Types.ObjectId, ref: 'Answer' },
	},
	{ timestamps: true }
);

const Like = mongoose.model('Like', likeSchema);

module.exports = { Like };
