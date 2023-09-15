const router = require('express').Router();
const { signIn } = require('../controllers/user');
const { signInValidation } = require('../middlewares/validator');

router.use(signInValidation);
router.post('/signIn', signIn);

module.exports = router;
