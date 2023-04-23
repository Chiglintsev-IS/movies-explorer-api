const express = require('express');

const router = express.Router();
const usersController = require('../controllers/userController');
const userValidators = require('../middlewares/validators/userValidators');

router.get('/me', usersController.getUser);
router.patch('/me', userValidators.updateUserValidator, usersController.updateUser);

module.exports = router;
