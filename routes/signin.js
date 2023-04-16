const express = require('express');

const router = express.Router();
const authController = require('../controllers/authController');
const authValidator = require('../middlewares/validators/authValidators');

router.post('/', authValidator.signinValidator, authController.signin);

module.exports = router;
