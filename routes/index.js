const router = require('express').Router();
const auth = require('../middlewares/auth');

router.post('/signin', require('./signIn'));
router.post('/signup', require('./signUp'));

router.use(auth);

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));
router.use('*', require('./errorRoute'));

module.exports = router;
