const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema(
	{
		answer: { type: String, required: true, minlength: 5, maxlength: 500 },
		likes: { type: Number, default: 0 },
		dislikes: { type: Number, default: 0 },
		createdBy: { type: mongoose.Types.ObjectId, ref: 'User' },
		questionId: { type: mongoose.Types.ObjectId, ref: 'Question' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Answer', answerSchema);
