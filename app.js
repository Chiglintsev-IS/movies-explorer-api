require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const connect = require('./configs/db');
const { PORT } = require('./configs/config');
const moviesRoutes = require('./routes/moviesRoutes');
const userRoutes = require('./routes/usersRoutes');
const signinRoutes = require('./routes/signinRoutes');
const signupRoutes = require('./routes/signupRoutes');
const authMiddleware = require('./middlewares/authMiddleware');
const expressSetup = require('./configs/expressSetup');
const logger = require('./middlewares/logger');

const app = express();
expressSetup(app);

app.use(logger.requestLogger);
app.use('/signin', signinRoutes);
app.use('/signup', signupRoutes);
app.use('/movies', authMiddleware, moviesRoutes);
app.use('/users', authMiddleware, userRoutes);

app.use(logger.errorLogger);
app.use(errors());

connect();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
