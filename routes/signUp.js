const router = require('express').Router();
const { createUser } = require('../controllers/user');
const { celebrate, Joi } = require('celebrate');

router.post(
  '/signup',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().required().email(),
      password: Joi.string().required().min(8),
      name: Joi.string().required().min(2),
    }),
  }),
  createUser,
);
module.exports = router;
