const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getMyInfo, changeMyInfo } = require('../controllers/user');

router.get('/me', getMyInfo);
router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      email: Joi.string().email(),
      name: Joi.string().min(2).max(30),
    }),
  }),
  changeMyInfo,
);
module.exports = router;
