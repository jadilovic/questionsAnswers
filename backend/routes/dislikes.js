const express = require('express');
const router = express.Router();

const {
	deleteDislike,
	createDislike,
	getDislike,
	getDislikeAnswer,
} = require('../controllers/dislikes');

router.route('/').post(createDislike);
router.route('/:id').delete(deleteDislike).get(getDislike);
router.route('/answer/:id').get(getDislikeAnswer);

module.exports = router;
