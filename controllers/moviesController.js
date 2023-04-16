const Movie = require('../models/movie');

const getMovies = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const movies = await Movie.getMoviesByOwner(userId);
    res.send(movies);
  } catch (error) {
    next(error);
  }
};

const addMovie = async (req, res, next) => {
  try {
    const movieData = req.body;
    const userId = req.user._id;
    const movie = await Movie.addMovie(movieData, userId);
    res.send(movie).status(201);
  } catch (error) {
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
    next(error);
  }
};

module.exports = {
  getMovies,
  addMovie,
  deleteMovie,
};
