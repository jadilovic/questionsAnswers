const express = require('express');
const router = express.Router();

const {
	deleteLike,
	createLike,
	getLike,
	getLikeAnswer,
} = require('../controllers/likes');

router.route('/').post(createLike);
router.route('/:id').delete(deleteLike).get(getLike);
router.route('/answer/:id').get(getLikeAnswer);

module.exports = router;
