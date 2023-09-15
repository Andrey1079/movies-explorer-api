const router = require('express').Router();
const { notfoundMessages } = require('../variables/errorMessages');

router.all('/', (req, res) => {
  res.send(notfoundMessages.pageNotFound);
});
module.exports = router;
