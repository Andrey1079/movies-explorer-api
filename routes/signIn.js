const router = require('express').Router();
const { signIn } = require('../controllers/user');

router.post('/signIn', signIn);
module.exports = router;
