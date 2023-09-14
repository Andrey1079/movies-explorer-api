const router = require('express').Router();
const { ceelbrate, Joi, celebrate } = require('celebrate');
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movies');

router.get('/', getAllMovies);
router.post('/', celebrate({
  body:Joi.object().keys({
   country:
  })
}), createMovie);
router.delete('/:id', deleteMovie);
module.exports = router;
