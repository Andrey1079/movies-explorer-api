const router = require('express').Router();
const { Joi, celebrate } = require('celebrate');
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movies');
const urlPattern = require('../variables/urlPattern');

router.get('/', getAllMovies);
router.post(
  '/',
  celebrate({
    body: Joi.object().keys({
      country: Joi.string().min(3).required(),
      director: Joi.string().min(2).required(),
      duration: Joi.number().required(),
      year: Joi.string().min(4).required(),
      description: Joi.string().min(10).required(),
      image: Joi.string().pattern(urlPattern).required(),
      trilerLink: Joi.string().pattern(urlPattern).required(),
      thumbnail: Joi.string().pattern(urlPattern).required(),
      movieId: Joi.number().required(),
      nameRU: Joi.string().min(2).required(),
      nameEN: Joi.string().min(2).required(),
    }),
  }),
  createMovie,
);
router.delete(
  '/:id',
  celebrate({
    params: Joi.object().keys({
      id: Joi.string().length(24).hex().required(),
    }),
  }),
  deleteMovie,
);
module.exports = router;
