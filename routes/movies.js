const express = require('express');

const router = express.Router();
const { getMovies, addMovie, deleteMovie } = require('../controllers/movies');
const { addMovieValidator, deleteMovieValidator, getMoviesValidator } = require('../middlewares/validators/movieValidators');

router.get('/', getMoviesValidator, getMovies);
router.post('/', addMovieValidator, addMovie);
router.delete('/:id', deleteMovieValidator, deleteMovie);

module.exports = router;
