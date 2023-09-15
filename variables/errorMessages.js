const conflictMessages = {
  alreadyExists: 'Пользователь с таким Email уже существует',
};
const notfoundMessages = {
  userIsAbsent: 'Такого пользователя не существует',
  movieIsAbsent: 'Такого фильма не существует',
  pageNotFound: 'Такой страницы не существует',
};
const badRequestMessages = {
  maxLength: 'символа - это максимальная длина поля',
  minLength: 'символа - это минимальная длина поля',
  required: '- обязательно поле',
  idIsWrong: 'Такого пользователя не существует',
  incorrectEmail: 'Не корректный email',
  incorrectURL: 'Не корректный URL',
  incorrectId: 'Не корректный id',
};
const serverErrorMessage = 'На сервере произошла ошибка';

const unAuthorizedMessages = {
  wrongData: 'Не корректные почта или пароль',
};

const forbidenMessages = {
  itIsntYour: 'У вас нет прав на удаление данного фильма',
};

module.exports = {
  conflictMessages,
  notfoundMessages,
  badRequestMessages,
  serverErrorMessage,
  unAuthorizedMessages,
  forbidenMessages,
};
