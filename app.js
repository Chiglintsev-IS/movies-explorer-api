require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const connect = require('./configs/db');
const { PORT } = require('./configs/config');

const signinRoutes = require('./routes/signinRoutes');
const signupRoutes = require('./routes/signupRoutes');
const moviesRoutes = require('./routes/moviesRoutes');
const userRoutes = require('./routes/usersRoutes');

const expressSetup = require('./configs/expressSetup');
const authMiddleware = require('./middlewares/authMiddleware');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
expressSetup(app);

app.use(logger.requestLogger);
app.use('/signin', signinRoutes);
app.use('/signup', signupRoutes);
app.use('/movies', authMiddleware, moviesRoutes);
app.use('/users', authMiddleware, userRoutes);

app.use(logger.errorLogger);
app.use(errorHandler);
app.use(errors());

connect();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
