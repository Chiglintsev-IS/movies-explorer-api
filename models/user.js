const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/config');
const { serializeUser } = require('../utils/serializers');
const errorMessages = require('../utils/errorMessages');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: errorMessages.wrongEmail,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
    minlength: 1,
  },
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
});

// Функция хеширования пароля перед сохранением пользователя
userSchema.pre('save', async function hashPassrword(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

// Функция для создания пользователя
userSchema.statics.createUser = async function createUser(email, password, name) {
  const user = await this.create({ email, password, name });
  return serializeUser(user);
};

// Функция для поиска пользователя по id
userSchema.statics.findUserById = async function findUserById(id) {
  const user = await this
    .findById(id)
    .orFail(new NotFoundError(errorMessages.userNotFound));
  return serializeUser(user);
};

// Функция для обновления данных пользователя
userSchema.statics.updateUser = async function updateUser(id, email, name) {
  const user = await this
    .findByIdAndUpdate(
      id,
      { email, name },
      { new: true, runValidators: true },
    )
    .orFail(new NotFoundError(errorMessages.userNotFound));
  return serializeUser(user);
};

// Функция поиска пользователя по email и проверки пароля
userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  const user = await this.findOne({ email }).select('+password');
  if (!user) {
    throw new UnauthorizedError(errorMessages.wrongEmailOrPassword);
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new UnauthorizedError(errorMessages.wrongEmailOrPassword);
  }
  return user;
};

// Функция генерации токена аутентификации для пользователя
userSchema.methods.generateAuthToken = async function generateAuthToken() {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET);
  return token;
};

module.exports = mongoose.model('user', userSchema);
