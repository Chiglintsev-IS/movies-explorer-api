const User = require('../models/user');

const getUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const user = await User
      .findById(_id)
      .orFail(new Error('Пользователь не найден'));
    res.send({ user });
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
    const user = await User
      .findByIdAndUpdate(
        _id,
        { email, name },
        { new: true, runValidators: true },
      ).orFail(new Error('Пользователь не найден'));
    res.send({ user });
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
