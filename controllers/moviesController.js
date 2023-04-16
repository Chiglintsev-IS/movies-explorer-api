const Movie = require('../models/movie');

const getMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({ owner: req.user._id });
    res.send(movies || []);
  } catch (error) {
    next(error);
  }
};

const addMovie = async (req, res, next) => {
  try {
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
    } = req.body;
    const movie = await Movie.create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId,
      owner: req.user._id,
    });
    res.send(movie);
  } catch (error) {
    next(error);
  }
};

const deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params.id).select('+owner');
    if (!movie) {
      throw new Error('Movie not found');
    }
    if (movie.owner.toString() !== req.user._id) {
      throw new Error('You are not owner of this movie');
    }
    await Movie.findByIdAndRemove(req.params.id);
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
