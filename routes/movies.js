const router = require('express').Router();
const { getMyMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validator');

router.get('/', getMyMovies);

router.post('/', createMovieValidation, createMovie);

router.delete('/:id', deleteMovieValidation, deleteMovie);

module.exports = router;
