const mongoose = require('mongoose');
const validator = require('validator');
const { badRequestMessages } = require('../variables/errorMessages');

const movieSchema = new mongoose.Schema(
  {
    country: {
      type: String,
      required: [true, `"Страна" ${badRequestMessages.required}`],
      minlength: [3, `3 ${badRequestMessages.minLength} "Страна"`],
    },
    director: {
      type: String,
      required: [true, `"Режиссер" ${badRequestMessages.required}`],
      minlength: [2, `2 ${badRequestMessages.minLength} "Режиссер"`],
    },
    duration: {
      type: Number,
      required: [true, `"Продолжительность" ${badRequestMessages.required}`],
    },
    year: {
      type: String,
      required: [true, `"Год" ${badRequestMessages.required}`],
      minlength: [4, `4 ${badRequestMessages.minLength} "Год"`],
    },
    description: {
      type: String,
      required: [true, `"Описание" ${badRequestMessages.required}`],
      minlength: [10, `3 ${badRequestMessages.minLength} "Описание"`],
    },
    image: {
      type: String,
      required: [true, `"Ссылка на постер" ${badRequestMessages.required}`],
      validate: { validator: (v) => validator.isURL(v), message: badRequestMessages.incorrectURL },
    },
    trilerLink: {
      type: String,
      required: [true, `"Ссылка на трейлер" ${badRequestMessages.required}`],
      validate: { validator: (v) => validator.isURL(v), message: badRequestMessages.incorrectURL },
    },
    thumbnail: {
      type: String,
      required: [true, `"Миниатюрное изображение к фильму" ${badRequestMessages.required}`],
      validate: { validator: (v) => validator.isURL(v), message: badRequestMessages.incorrectURL },
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
      required: [true, `"Название на русском языке" ${badRequestMessages.required}`],
      minlength: [2, `2 ${badRequestMessages.minLength} "Название на русском языке"`],
    },
    nameEN: {
      type: String,
      required: [true, `"Название на английском языке" ${badRequestMessages.required}`],
      minlength: [2, `2 ${badRequestMessages.minLength} "Название на английском языке"`],
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model('movie', movieSchema);
