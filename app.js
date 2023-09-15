const procces = require('process');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const celebrate = require('celebrate').errors;
const helmet = require('helmet');
const limiter = require('./utils/limiter');
const error = require('./middlewares/errors');
const { requestLogger, errorLoger } = require('./middlewares/loger');

const app = express();

const { PORT = '3000', DB_URL = 'mongodb://127.0.0.1:27017/bitfilmsdb ' } = procces.env;
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});
app.use(requestLogger);
app.use(limiter);
app.use(helmet());
app.use(bodyParser.json());

app.use('/', require('./routes'));

app.use(errorLoger);
app.use(celebrate());
app.use(error);

app.listen(PORT);
