const errorHandler = (err, req, res) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  res.status(err.statusCode).json({
    status: 'error',
    statusCode,
    message,
    errorType: err.name,
  });
};

module.exports = errorHandler;
