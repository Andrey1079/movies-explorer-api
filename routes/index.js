const router = require('express').Router();

router.post('/signin', require('./signIn'));
router.post('/signup', require('./signUp'));

router.use('/users', require('./users'));
router.use('/movies', require('./movies'));
router.use('*', require('./errorRoute'));

module.exports = router;
