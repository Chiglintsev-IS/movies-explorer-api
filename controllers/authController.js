const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const ConflictError = require('../errors/ConflictError');
const errorMessages = require('../utils/errorMessages');

const signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.createUser(email, password, name);
    res.status(201).send(user);
  } catch (err) {
    if (err.name === 'CastError' || err.name === 'ValidationError') {
      next(new BadRequest(errorMessages.invalidCreateUserDataPayload));
    }
    if (err.code === 11000) {
      next(new ConflictError(errorMessages.userAlreadyExists));
    }
    next(err);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findUserByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.send({ token });
  } catch (err) {
    next(err);
  }
};

module.exports = {
  signup,
  signin,
};
