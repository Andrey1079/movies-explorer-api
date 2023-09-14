const httpConstants = require('http2').constants;
const bcrypt = require('bcrypt');
const escape = require('escape-html');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { BadRequest, Conflict, NotFound } = require('../Errors');
const {
  conflictMessages,
  notfoundMessages,
  badRequestMessages,
} = require('../variables/errorMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getMyInfo = (req, res, next) => {
  const { _id } = req.user;
  User.findById({ _id })
    .orFail(new NotFound(notfoundMessages.userIsAbsent))
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.changeMyInfo = (req, res, next) => {
  const { _id } = req.user;
  if (req.body.name) req.body.name = escape(req.body.name);
  User.findByIdAndUpdate(_id, req.body, { new: true, runValidators: true })
    .orFail(new NotFound(notfoundMessages.userIsAbsent))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequest(err.message));
      }
      next(err);
    });
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
      .catch((err) => {
        if (err.name === 'ValidationError') {
          next(new BadRequest(err.message));
          return;
        }
        if (err.code === 11000) {
          next(new Conflict(conflictMessages.alreadyExists));
          return;
        }
        next(err);
      });
  });
};
