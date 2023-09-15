const router = require('express').Router();
const { getMyInfo, changeMyInfo } = require('../controllers/user');
const { changeMyInfoValidation } = require('../middlewares/validator');

router.get('/me', getMyInfo);

router.patch('/me', changeMyInfoValidation, changeMyInfo);
module.exports = router;
