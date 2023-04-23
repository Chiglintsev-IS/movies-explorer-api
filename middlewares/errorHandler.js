const errorMessages = require('../utils/errorMessages');

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || errorMessages.serverError;

  res.status(err.statusCode).json({
    status: 'error',
    statusCode,
    message,
    errorType: err.name,
  });

  next();
};

module.exports = errorHandler;
