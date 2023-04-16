const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose;

const movieSchema = new Schema({
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
      validator: (v) => validator.isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неправильный формат ссылки',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (v) => validator.isURL(v),
      message: 'Неправильный формат ссылки',
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

movieSchema.statics('addMovie', async function addMovie(movieData, userId) {
  const movie = await this.create({
    ...movieData,
    owner: userId,
  });
  return movie;
});

movieSchema.statics('deleteMovie', async function deleteMovie(movieId, userId) {
  const movie = await this.findById(movieId).select('+owner');
  if (!movie) {
    throw new Error('Movie not found');
  }
  if (movie.owner.toString() !== userId) {
    throw new Error('You are not owner of this movie');
  }
  await movie.remove();
  return movie;
});

movieSchema.statics('getMoviesByOwner', async function getMoviesByOwner(userId) {
  const movies = await this.find({ owner: userId });
  return movies || [];
});

module.exports = mongoose.model('movie', movieSchema);
