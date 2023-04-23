const Movie = require('../models/movie');
const BadRequest = require('../errors/BadRequest');
const errorMessages = require('../utils/errorMessages');

const getMovies = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const movies = await Movie.getMoviesByOwner(userId);
    res.send(movies);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequest(errorMessages.wrongUserId));
    }
    next(error);
  }
};

const addMovie = async (req, res, next) => {
  try {
    const movieData = req.body;
    const userId = req.user._id;
    const movie = await Movie.addMovie(movieData, userId);
    res.status(201).send(movie);
  } catch (error) {
    if (error.name === 'CastError' || error.name === 'ValidationError') {
      next(new BadRequest(errorMessages.invalidMovieDataPayload));
    }
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movieId = req.params.id;
    const userId = req.user._id;
    const movie = await Movie.deleteMovie(movieId, userId);
    res.send(movie);
  } catch (error) {
    if (error.name === 'CastError') {
      next(new BadRequest(errorMessages.wrongMovieId));
    }
    next(error);
  }
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
