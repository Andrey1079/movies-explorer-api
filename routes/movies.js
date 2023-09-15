const router = require('express').Router();
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { createMovieValidation, deleteMovieValidation } = require('../middlewares/validator');

router.get('/', getAllMovies);

router.use(createMovieValidation);
router.post('/', createMovie);

router.use(deleteMovieValidation);
router.delete('/:id', deleteMovie);

module.exports = router;
