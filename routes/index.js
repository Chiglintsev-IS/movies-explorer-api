const express = require('express');

const router = express.Router();

const signinRoutes = require('./signinRoutes');
const signupRoutes = require('./signupRoutes');
const moviesRoutes = require('./moviesRoutes');
const usersRoutes = require('./usersRoutes');
const authMiddleware = require('../middlewares/authMiddleware');

router.use('/signin', signinRoutes);
router.use('/signup', signupRoutes);
router.use('/movies', authMiddleware, moviesRoutes);
router.use('/users', authMiddleware, usersRoutes);

module.exports = router;
