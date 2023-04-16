const express = require('express');

const router = express.Router();
const { getUser, updateUser } = require('../controllers/users');
const { updateUserValidator } = require('../middlewares/validators/userValidators');

router.get('/me', getUser);
router.patch('/me', updateUserValidator, updateUser);

module.exports = router;
