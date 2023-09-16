const router = require('express').Router();
const { notfoundMessages } = require('../variables/apiMessages');

router.all('/', (req, res) => {
  res.send(notfoundMessages.pageNotFound);
});
module.exports = router;
