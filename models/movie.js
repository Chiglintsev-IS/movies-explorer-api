const mongoose = require('mongoose');
const validator = require('validator');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');
const errorMessages = require('../utils/errorMessages');
const ConflictError = require('../errors/ConflictError');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: errorMessages.wrongUrl,
    },
  },
  trailer: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: errorMessages.wrongUrl,
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: validator.isURL,
      message: errorMessages.wrongUrl,
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
});

// add movie if only it was not added before for this user
movieSchema.statics.addMovie = async function addMovie(movieData, userId) {
  const movie = await this.findOne({
    movieId: movieData.movieId,
    owner: userId,
  });
  if (movie) {
    throw new ConflictError(errorMessages.movieAlreadyAdded);
  }
  const newMovie = await this.create({
    ...movieData,
    owner: userId,
  });
  return newMovie;
};

movieSchema.statics.deleteMovie = async function deleteMovie(movieId, userId) {
  const movie = await this.findById(movieId).select('+owner');
  if (!movie) {
    throw new NotFoundError(errorMessages.movieNotFound);
  }
  if (movie.owner.toString() !== userId) {
    throw new ForbiddenError(errorMessages.forbidden);
  }
  await this.deleteOne({ _id: movieId });
  return movie;
};

movieSchema.statics.getMoviesByOwner = async function getMoviesByOwner(userId) {
  const movies = await this.find({ owner: userId });
  return movies || [];
};

module.exports = mongoose.model('movie', movieSchema);
