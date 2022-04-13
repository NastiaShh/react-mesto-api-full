const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
const { validateRegister, validateLogin } = require('./middlewares/validation');
const NotFoundError = require('./errors/NotFoundError');
const errorHandler = require('./middlewares/errorHandler');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
require('dotenv').config();

app.use(cors({
  origin: ['http://mesto.nsh.nomoredomains.work',
    'https://mesto.nsh.nomoredomains.work',
    'http://api.mesto.nsh.nomoredomains.work',
    'https://api.mesto.nsh.nomoredomains.work',
    'http://localhost:3000',
    'https://localhost:3000'],
  credentials: true,
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', validateRegister, createUser);
app.post('/signin', validateLogin, login);

app.use(cookieParser());
app.use(helmet());
app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(() => {
  throw new NotFoundError('Страница не найдена');
});

app.use(errorLogger);

app.use(errors());
app.use(errorHandler);

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-template-curly-in-string
  console.log(`App listening on port ${PORT}`);
});
