const { HTTP_STATUS_INTERNAL_SERVER_ERROR } = require('http2').constants;

const BadRequest = require('../Errors/BadRequest');
const Conflict = require('../Errors/Conflict');
// const NotFound = require('../Errors/NotFound');
// const UnAuthorized = require('../Errors/UnAuthorized');

module.exports = (err, req, res, next) => {
  const sendErrorRes = (newErr) => {
    const {
      statusCode = HTTP_STATUS_INTERNAL_SERVER_ERROR,
      message = 'На сервере произошла ошибка',
    } = newErr;
    res.status(statusCode).send({ message: `name: ${err.name}, text: ${message} ` });
    next();
  };

  if (err.code === 11000) {
    console.log('asdfasd');
    sendErrorRes(new Conflict('Пользователь с таким email уже существует'));
  }
  if (err.name === 'ValidationError') {
    sendErrorRes(new BadRequest(err.message));
  } else {
    sendErrorRes();
  }
};
