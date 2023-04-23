require('dotenv').config();
const express = require('express');
const { errors } = require('celebrate');
const connect = require('./configs/db');
const { PORT } = require('./configs/config');

const expressSetup = require('./configs/expressSetup');
const routes = require('./routes/index');
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
app.use(logger.requestLogger);
expressSetup(app);

app.use(routes);

app.use(logger.errorLogger);
app.use(errors());
app.use(errorHandler);

connect();

app.listen(PORT);
