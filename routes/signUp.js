const router = require('express').Router();
const { createUser } = require('../controllers/user');
const { signUpValidation } = require('../middlewares/validator');

router.post('/signup', signUpValidation, createUser);
module.exports = router;
