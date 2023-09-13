const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, 'Поле "email" должно быть заполнено'],
      validate: {
        validator: (v) => validator.isEmail(v),
        message: 'Не корректный email',
      },
      minlength: [5, 'Минимальная длина поля "email" должно быть 5 символа'],
    },
    password: {
      type: String,
      select: false,
      required: [true, 'Поле "password" должно быть заполнено'],
    },
    name: {
      type: String,
      requred: [true, 'Поле "Имя" должно быть заполнено'],
      minlength: [2, 'Минимальная длина поля "Имя" должно быть 2 символа'],
      maxlength: [30, 'Максимальная длина поля "Имя" должно быть 30 символа'],
    },
  },
  { versionKey: false },
);
module.exports = mongoose.model('user', userSchema);
