const express = require('express');
const router = express.Router();

const {
	getAllQuestions,
	// getQuestion,
	// deleteQuestion,
	createQuestion,
	updateQuestion,
} = require('../controllers/questions');

router.route('/').post(createQuestion);
router.route('/:id').patch(updateQuestion).get(getAllQuestions);
// 	.get(getQuestion);
// 	.delete(deleteQuestion);

module.exports = router;
