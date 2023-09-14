const escape = require('escape-html');
const Movie = require('../models/movies');

module.exports.getAllMovies = (req, res) => {
  res.send({ message: 'allMovies' });
};
module.exports.createMovie = (req, res) => {
  const { _id } = req.user;
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trilerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;
  Movie.create({
    country: escape(country),
    director: escape(director),
    year: escape(year),
    description: escape(description),
    image,
    duration,
    trilerLink,
    thumbnail,
    movieId,
    nameRU: escape(nameRU),
    nameEN: escape(nameEN),
    owner: _id,
  }).then((movie) => {
    res.send(movie);
  });
};
module.exports.deleteMovie = (req, res) => {
  res.send({ message: 'movie deleted' });
};
