const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('http2').constants;

const BadRequest = require('../Errors/BadRequest');
const Conflict = require('../Errors/Conflict');
const NotFound = require('../Errors/NotFound');
const UnAuthorized = require('../Errors/UnAuthorized');

module.exports = (err, req, res, next) => {
  res.send(err.message);
  next();
};
