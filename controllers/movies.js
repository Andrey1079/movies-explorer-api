const escape = require('escape-html');
const Movie = require('../models/movies');
const { NotFound, Forbiden, BadRequest } = require('../Errors');
const {
  notfoundMessages,
  forbidenMessages,
  badRequestMessages,
} = require('../variables/errorMessages');

module.exports.getAllMovies = async (req, res, next) => {
  try {
    const movies = await Movie.find({}).populate('owner');
    res.send(movies);
  } catch (err) {
    next(err);
  }
};

module.exports.createMovie = async (req, res, next) => {
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
  try {
    const movie = await Movie.create({
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
    });
    res.send(movie);
  } catch (err) {
    next(err);
  }
};
module.exports.deleteMovie = async (req, res, next) => {
  const { _id } = req.user;
  const movieId = req.params.id;
  try {
    const movie = await Movie.findById(movieId).orFail(
      new NotFound(notfoundMessages.movieIsAbsent),
    );
    if (movie.owner.toString() === _id) {
      try {
        await Movie.deleteOne(movie);
        res.send('Фильм удален');
      } catch (err) {
        next(err);
      }
    } else {
      next(new Forbiden(forbidenMessages.itIsntYour));
    }
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest(badRequestMessages.incorrectId));
      return;
    }
    next(err);
  }
};
