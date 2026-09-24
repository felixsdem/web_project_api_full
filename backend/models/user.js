const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const URL_REGEX = require('../utils/urlRegex');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Jacques Cousteau',
  },

  about: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: 'Explorador',
  },

  avatar: {
    type: String,
    validate: {
      validator(value) {
        return URL_REGEX.test(value);
      },
      message: 'El enlace del avatar no es válido',
    },
    default:
      'https://practicum-content.s3.us-west-1.amazonaws.com/resources/moved_avatar_1604080799.jpg',
  },

  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: 'El correo electrónico no es válido',
    },
  },

  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error('Correo o contraseña incorrectos'));
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            return Promise.reject(new Error('Correo o contraseña incorrectos'));
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
