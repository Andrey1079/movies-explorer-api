const router = require('express').Router();
const { createUser } = require('../controllers/user');
const { signUpValidation } = require('../middlewares/validator');

router.use(signUpValidation);
router.post('/signup', createUser);
module.exports = router;
