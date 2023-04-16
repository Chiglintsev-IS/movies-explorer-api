const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/config');

const authMiddleware = (req, res, next) => {
  const authHeader = req.header('Authorization');
  if (!authHeader) {
    return next(new Error('Not authorized to access this route'));
  }

  const token = req.header('Authorization').replace('Bearer ', '');
  if (!token) {
    return next(new Error('Not authorized to access this route'));
  }

  try {
    const jwtData = jwt.verify(token, JWT_SECRET);
    req.user = { ...req.user, _id: jwtData._id };
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = authMiddleware;
