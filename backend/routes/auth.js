const router = require('express').Router();

const { login } = require('../controllers/auth');
const { createUser } = require('../controllers/users');

const {
  validateCreateUser,
  validateLogin,
} = require('../validations/validation');

router.post('/signup', validateCreateUser, createUser);

router.post('/signin', validateLogin, login);

module.exports = router;
