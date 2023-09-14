const BadRequest = require('../Errors/BadRequest');
const Conflict = require('../Errors/Conflict');
const InternalServerError = require('../Errors/InternalServerError');
// const NotFound = require('../Errors/NotFound');
// const UnAuthorized = require('../Errors/UnAuthorized');

module.exports = (err, req, res, next) => {
  console.log(err.name);
  // const sendErrorRes = (newErr) => {
  //   const { statusCode, message } = newErr;
  //   res.status(statusCode).send({ message: `name: ${newErr.name}, text: ${message} ` });
  //   next();
  // };
  // if (err.code === 11000) {
  //   console.log('conflict');
  //   sendErrorRes(new Conflict('Пользователь с таким email уже существует'));
  // }
  // if (err.name === 'ValidationError') {
  //   console.log('badrequest');
  //   sendErrorRes(new BadRequest(err.message));
  // } else {
  //   sendErrorRes(new InternalServerError('На сервере произошла ошибка'));
  // }
};
