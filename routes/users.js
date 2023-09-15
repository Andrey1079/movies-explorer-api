const router = require('express').Router();
const { getMyInfo, changeMyInfo } = require('../controllers/user');
const { changeMyInfoValidation } = require('../middlewares/validator');

router.get('/me', getMyInfo);

router.use(changeMyInfoValidation);
router.patch('/me', changeMyInfo);
module.exports = router;
