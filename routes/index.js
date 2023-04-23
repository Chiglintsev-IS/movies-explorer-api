const express = require('express');

const router = express.Router();
const signinRoutes = require('./signinRoutes');
const signupRoutes = require('./signupRoutes');
const moviesRoutes = require('./moviesRoutes');
const usersRoutes = require('./usersRoutes');
const authMiddleware = require('../middlewares/authMiddleware');
const NotFoundError = require('../errors/NotFoundError');
const errorMessages = require('../utils/errorMessages');

router.use('/signin', signinRoutes);
router.use('/signup', signupRoutes);
router.use('/movies', authMiddleware, moviesRoutes);
router.use('/users', authMiddleware, usersRoutes);

router.get('/', (req, res) => {
  res.status(200).send('<html><head><title>API</title></head><body><h1>Hello world</h1></body></html>');
});
router.use((req, res, next) => {
  next(new NotFoundError(errorMessages.routeNotFound));
});

module.exports = router;
