const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema(
	{
		title: { type: String, required: true, minlength: 5, maxlength: 50 },
		question: { type: String, required: true, minlength: 5, maxlength: 500 },
		likes: { type: Number, default: 0 },
		dislikes: { type: Number, default: 0 },
		createdBy: { type: mongoose.Types.ObjectId, ref: 'User' },
	},
	{ timestamps: true }
);

module.exports = mongoose.model('Question', questionSchema);
