const router = require('express').Router();
const { signIn } = require('../controllers/user');
const { celebrate, Joi } = require('celebrate');

router.post(
  '/signIn',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required().min(8),
    }),
  }),
  signIn,
);
module.exports = router;
