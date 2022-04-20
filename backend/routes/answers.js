const express = require('express');
const router = express.Router();

const {
	getAllAnswers,
	// getAnswer,
	deleteAnswer,
	createAnswer,
	updateAnswer,
} = require('../controllers/answers');

router.route('/').post(createAnswer);
router
	.route('/:id')
	.get(getAllAnswers)
	.delete(deleteAnswer)
	.patch(updateAnswer);
// 	.get(getAnswer)

module.exports = router;
