const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const { UnAuthorized } = require('../Errors');
const { badRequestMessages, unAuthorizedMessages } = require('../variables/apiMessages');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      unique: true,
      required: [true, `"email" ${badRequestMessages.required}`],
      validate: {
        validator: (v) => validator.isEmail(v),
        message: badRequestMessages.incorrectEmail,
      },
      minlength: [5, `5 ${badRequestMessages.minLength} "email"`],
    },
    password: {
      type: String,
      select: false,
      required: [true, `"password" ${badRequestMessages.required}`],
    },
    name: {
      type: String,
      requred: [true, `"Имя" ${badRequestMessages.required}`],
      minlength: [2, `2 ${badRequestMessages.minLength} "Имя"`],
      maxlength: [30, `30 ${badRequestMessages.minLength} "Имя"`],
    },
  },
  { versionKey: false },
);

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnAuthorized(unAuthorizedMessages.wrongData);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new UnAuthorized(unAuthorizedMessages.wrongData);
        }
        return user;
      });
    });
};
module.exports = mongoose.model('user', userSchema);
