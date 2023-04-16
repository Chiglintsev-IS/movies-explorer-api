const { celebrate, Joi } = require('celebrate');

const getUserValidator = celebrate({
  user: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

const updateUserValidator = celebrate({
  user: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
  }),
});

module.exports = {
  getUserValidator,
  updateUserValidator,
};
