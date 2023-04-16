const User = require('../models/user');

const getUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User.findUserById(_id);
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      err.message = 'Неверный формат ID пользователя';
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
      err.message = 'Неверный формат ID пользователя';
    } else if (err.name === 'ValidationError') {
      err.message = 'Ошибка валидации';
    }
    next(err);
  }
};

module.exports = {
  getUser,
  updateUser,
};
