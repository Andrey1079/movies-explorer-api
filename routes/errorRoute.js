const router = require('express').Router();

router.all('/', (req, res) => {
  res.send('Нет такой страницы');
});
module.exports = router;
