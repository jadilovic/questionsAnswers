const express = require('express');
const router = express.Router();

const { getAllUsers, updateUser, getUser } = require('../controllers/users');

router.patch('/', updateUser);
router.get('/:id', getUser);
router.get('/allusers', getAllUsers);

module.exports = router;
