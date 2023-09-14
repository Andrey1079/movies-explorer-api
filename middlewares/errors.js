const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('http2').constants;
const { serverErrorMessage } = require('../variables/errorMessages');

module.exports = (err, req, res, next) => {
  const { statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR, message = serverErrorMessage } = err;
  res.status(statusCode).send({ message });
  next();
};
