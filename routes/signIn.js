const router = require('express').Router();
const { signIn } = require('../controllers/user');
const { signInValidation } = require('../middlewares/validator');

router.post('/signIn', signInValidation, signIn);

module.exports = router;
