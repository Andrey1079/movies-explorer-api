const router = require('express').Router();
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movies');
// const { ceelbrate, Joi, celebrate } = require('celebrate');

router.get('/', getAllMovies);
router.post('/', createMovie);
router.delete('/:id', deleteMovie);
module.exports = router;
