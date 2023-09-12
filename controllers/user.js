const httpConstants = require('http2').constants;
const bcrypt = require('bcrypt');
const escape = require('escape-html');
const User = require('../models/user');

module.exports.getMyInfo = (req, res) => {
  res.send({ message: 'info sent' });
};
module.exports.changeMyInfo = (req, res) => {
  res.send({ message: 'info changed' });
};
module.exports.signIn = (req, res) => {
  res.send({ message: 'logged in' });
};
module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 16).then((hash) => {
    User.create({
      name: name && escape(name),
      email,
      password: hash,
    })
      .then((user) => {
        res.status(httpConstants.HTTP_STATUS_CREATED).send({
          name: user.name,
          email: user.email,
          _id: user._id,
        });
      })
      .catch(next);
  });
};
