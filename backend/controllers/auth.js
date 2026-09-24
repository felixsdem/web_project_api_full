const jwt = require('jsonwebtoken');

const User = require('../models/user');

const { NODE_ENV, JWT_SECRET } = process.env;

const UNAUTHORIZED = 401;

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'super-secret-key',
        { expiresIn: '7d' },
      );

      return res.send({ token });
    })
    .catch(() => res.status(UNAUTHORIZED).send({
      message: 'Correo o contraseña incorrectos',
    }));
};
