const { celebrate, Joi } = require('celebrate');
const validator = require('validator');

const urlValidator = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.message('Неправильный формат ссылки');
};

const getMoviesValidator = celebrate({
  user: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
});

const addMovieValidator = celebrate({
  user: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidator),
    trailerLink: Joi.string().required().custom(urlValidator),
    thumbnail: Joi.string().required().custom(urlValidator),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const deleteMovieValidator = celebrate({
  user: Joi.object().keys({
    _id: Joi.string().hex().length(24),
  }),
  params: Joi.object().keys({
    movieId: Joi.string().hex().length(24),
  }),
});

module.exports = {
  addMovieValidator,
  deleteMovieValidator,
  getMoviesValidator,
};
