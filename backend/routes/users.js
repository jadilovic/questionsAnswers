const express = require('express');
const router = express.Router();

const { getAllUsers, updateUser, getUser } = require('../controllers/users');

router.get('/allusers', getAllUsers);
router.patch('/', updateUser);
router.get('/:id', getUser);

module.exports = router;
