const httpConstants = require('http2').constants;
const bcrypt = require('bcrypt');
const escape = require('escape-html');
const User = require('../models/user');
const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;
module.exports.getMyInfo = (req, res, next) => {
  res.send({ message: 'info sent' });
};

module.exports.changeMyInfo = (req, res, next) => {
  console.log(req.user);
  // User.findByIdAndUpdate(req.user._id, req.body``);
};

module.exports.signIn = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : '123456789',
        { expiresIn: '7d' },
      );
      res.send(token);
    })
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, email, password } = req.body;

  bcrypt.hash(password, 16).then((hash) => {
    User.create({
      name: name ? escape(name) : email,
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
