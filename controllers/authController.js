const User = require('../models/user');

const signup = async (req, res, next) => {
  try {
    const { email, password, name } = req.body;
    const user = await User.create({ email, password, name });
    res.send({
      name: user.name,
      email: user.email,
    });
  } catch (err) {
    if (err.name === 'ValidationError') {
      err.message = 'Ошибка валидации';
    }
    if (err.code === 11000) {
      err.message = 'Пользователь с таким email уже существует';
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
