const mongoose = require('mongoose');
const validator = require('validator');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, 'Поле "Страна" должно быть заполнено (mongo)'],
    },
    director: {
      type: String,
      required: [true, 'Поле "Режиссер" должно быть заполнено (mongo)'],
    },
    duration: {
      type: Number,
      required: [true, 'Поле "Продолжительность" должно быть заполнено (mongo)'],
    },
    year: {
      type: String,
      required: [true, 'Поле "Год" должно быть заполнено (mongo)'],
    },
    description: {
      type: String,
      required: [true, 'Поле "Описание" должно быть заполнено (mongo)'],
      minlength: [10, 'Минимальная длина поля "Описание" должно быть 10 символов (mongo)'],
    },
    image: {
      type: String,
      required: [true, 'Поле "Ссылка на постер" должно быть заполнено (mongo)'],
      validate: { validator: (v) => validator.isURL(v), message: 'Некорректный URL (validator)' },
    },
    trilerLink: {
      type: String,
      required: [true, 'Поле "Ссылка на трейлер" должно быть заполнено (mongo)'],
      validate: { validator: (v) => validator.isURL(v), message: 'Некорректный URL (validator)' },
    },
    thumbnail: {
      type: String,
      required: [true, 'Поле "Миниатюрное изображение к фильму" должно быть заполнено (mongo)'],
      validate: { validator: (v) => validator.isURL(v), message: 'Некорректный URL (validator)' },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
    },
    movieId: {
      type: Number,
    },

    nameRU: {
      type: String,
      required: [true, 'Поле "Название на русском языке" должно быть заполнено (mongo)'],
      minlength: [
        10,
        'Минимальная длина поля "Название на русском языке" должно быть 2 символа (mongo)',
      ],
    },
    nameEN: {
      type: String,
      required: [true, 'Поле "Название на английском языке" должно быть заполнено (mongo)'],
      minlength: [
        10,
        'Минимальная длина поля "Название на английском языке" должно быть 2 символа (mongo)',
      ],
    },
  },
  { versionKey: false },
);
