const express = require('express');

const router = express.Router();
const moviesController = require('../controllers/moviesController');
const movieValidators = require('../middlewares/validators/movieValidators');

router.get('/', moviesController.getMovies);
router.post('/', movieValidators.addMovieValidator, moviesController.addMovie);
router.delete('/:id', movieValidators.deleteMovieValidator, moviesController.deleteMovie);

module.exports = router;
