const express = require('express');
const router = express.Router();

const {
	getAllAnswers,
	// getAnswer,
	deleteAnswer,
	createAnswer,
	// updateAnswer,
} = require('../controllers/answers');

router.route('/').post(createAnswer);
router.route('/:id').get(getAllAnswers).delete(deleteAnswer);
// router
// 	.route('/:id')
// 	.get(getAnswer)
// 	.patch(updateAnswer)

module.exports = router;
