const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: [true, 'Поле "email" должно быть заполнено (mongo)'],
    validate: { validator: (v) => validator.isEmail(v), message: 'Не корректный email (valiator)' },
  },
  password: {
    type: String,
    select: false,
    required: [true, 'Поле "password" должно быть заполнено (mongo'],
  },
  name: {
    type: String,
    requred: [true, 'Поле "Имя" должно быть заполнено (mongo)'],
    minlength: [2, 'Минимальная длина поля "Имя" должно быть 2 символа (mongo)'],
    maxlength: [30, 'Максимальная длина поля "Имя" должно быть 30 символа (mongo)'],
    default: 'Имя',
  },
});
