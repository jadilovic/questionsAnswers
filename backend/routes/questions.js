const express = require('express');
const router = express.Router();

const {
	getAllQuestions,
	createQuestion,
	updateQuestion,
} = require('../controllers/questions');

router.route('/').post(createQuestion);
router.route('/:id').patch(updateQuestion).get(getAllQuestions);

module.exports = router;
