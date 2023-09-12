const router = require('express').Router();
const { getMyInfo, changeMyInfo } = require('../controllers/user');

router.get('/me', getMyInfo);
router.patch('/me', changeMyInfo);
module.exports = router;
