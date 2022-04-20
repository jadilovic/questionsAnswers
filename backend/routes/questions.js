const express = require('express');
const router = express.Router();

const {
	getAllQuestions,
	// getQuestion,
	// deleteQuestion,
	createQuestion,
	updateQuestion,
} = require('../controllers/questions');

router.route('/').post(createQuestion).get(getAllQuestions);
router.route('/:id').patch(updateQuestion);
// 	.get(getQuestion);
// 	.delete(deleteQuestion);

module.exports = router;
