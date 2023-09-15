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
//   Movie.find({})
//     .populate('owner')
//     .then((movies) => res.send(movies));
// };
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
module.exports.deleteMovie = (req, res, next) => {
  const { _id } = req.user;
  const movieId = req.params.id;
  Movie.findById(movieId)
    .orFail(new NotFound(notfoundMessages.movieIsAbsent))
    .then((movie) => {
      if (movie.owner.toString() === _id) {
        Movie.deleteOne(movie).then(res.send('Фильм удален'));
      } else {
        throw new Forbiden(forbidenMessages.itIsntYour);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequest(badRequestMessages.incorrectId));
      }
      next(err);
    });
};
