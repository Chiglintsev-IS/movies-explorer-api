const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/config');
const UnauthorizedError = require('../errors/UnauthorizedError');
const errorMessages = require('../utils/errorMessages');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return next(new UnauthorizedError(errorMessages.unauthorized));
  }

  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return next(new UnauthorizedError(errorMessages.unauthorized));
  }

  try {
    const jwtData = jwt.verify(token, JWT_SECRET);
    req.user = { ...req.user, _id: jwtData._id };
    return next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError' || error.message === 'invalid signature') {
      return next(new UnauthorizedError(errorMessages.unauthorized));
    }
    return next(error);
  }
};

module.exports = authMiddleware;
