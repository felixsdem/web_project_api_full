require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { errors } = require('celebrate');

const authRouter = require('./routes/auth');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');

const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const app = express();

mongoose.connect('mongodb://localhost:27017/aroundb')
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });

app.use(express.json());

// CORS
app.use(cors());
app.options('/{*any}', cors());

// Logs
app.use(requestLogger);

// Ruta temporal para la revisión
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('El servidor va a caer');
  }, 0);
});

// Rutas públicas
app.use(authRouter);

// Rutas protegidas
app.use(auth);

app.use(usersRouter);
app.use(cardsRouter);

// 404
app.use((req, res) => {
  res.status(404).send({ message: 'Recurso solicitado no encontrado' });
});

// Errores de Celebrate
app.use(errors());

// Log de errores
app.use(errorLogger);

// Middleware global de errores
app.use((err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const { statusCode = 500, message } = err;

  return res.status(statusCode).send({
    message: statusCode === 500
      ? 'Se ha producido un error en el servidor'
      : message,
  });
});

app.listen(3000, () => {
  console.log('App listening at port 3000');
});
