const httpConstants = require('http2').constants;
const bcrypt = require('bcrypt');
const escape = require('escape-html');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { BadRequest, Conflict, NotFound } = require('../Errors');
const {
  conflictMessages,
  notfoundMessages,
  badRequestMessages,
} = require('../variables/errorMessages');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.getMyInfo = async (req, res, next) => {
  const { _id } = req.user;
  try {
    const user = await User.findById({ _id }).orFail(new NotFound(notfoundMessages.userIsAbsent));
    res.send(user);
  } catch (err) {
    if (err.name === 'CastError') {
      next(new BadRequest(badRequestMessages.incorrectId));
      return;
    }
    next(err);
  }
};

module.exports.changeMyInfo = async (req, res, next) => {
  const { _id } = req.user;
  if (req.body.name) req.body.name = escape(req.body.name);
  try {
    const user = await User.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    }).orFail(new NotFound(notfoundMessages.userIsAbsent));
    res.send(user);
  } catch (err) {
    if (err.name === 'ValidationError') {
      next(new BadRequest(err.message));
      return;
    }
    if (err.name === 'CastError') {
      next(new BadRequest(badRequestMessages.incorrectId));
      return;
    }
    next(err);
  }
};

module.exports.signIn = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const user = await User.findUserByCredentials(email, password);
    const token = jwt.sign(
      { _id: user._id },
      NODE_ENV === 'production' ? JWT_SECRET : '123456789',
      {
        expiresIn: '7d',
      },
    );
    res.send(token);
  } catch (err) {
    next(err);
  }
};

module.exports.createUser = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const hash = await bcrypt.hash(password, 16);

    try {
      const user = await User.create({
        name: name ? escape(name) : email,
        email,
        password: hash,
      });
      res.status(httpConstants.HTTP_STATUS_CREATED).send({
        name: user.name,
        email: user.email,
        _id: user._id,
      });
    } catch (err) {
      if (err.name === 'ValidationError') {
        next(new BadRequest(err.message));
        return;
      }
      if (err.code === 11000) {
        next(new Conflict(conflictMessages.alreadyExists));
        return;
      }
      next(err);
    }
  } catch (err) {
    next(err);
  }
};
