const express = require('express');

const router = express.Router();
const { getUser, updateUser } = require('../controllers/users');
const { getUserValidator, updateUserValidator } = require('../middlewares/validators/userValidators');

router.get('/me', getUserValidator, getUser);
router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
