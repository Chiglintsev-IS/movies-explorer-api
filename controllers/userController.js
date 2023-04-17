const User = require('../models/user');
const BadRequest = require('../errors/BadRequest');
const errorMessages = require('../utils/errorMessages');

const getUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findUserById(_id);
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest(errorMessages.wrongUserId));
    }
    next(err);
  }
};

const updateUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { email, name } = req.body;
    const user = await User.updateUser(_id, email, name);
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest(errorMessages.wrongUserId));
    } else if (err.name === 'ValidationError') {
      next(new BadRequest(errorMessages.invalidUpdateUserDataPayload));
    }
    next(err);
  }
};

module.exports = {
  getUser,
  updateUser,
};
