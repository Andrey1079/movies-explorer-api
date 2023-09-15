const procces = require('process');
const { dbUrl, port } = require('./variables/devServerConfig');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const celebrate = require('celebrate').errors;
const helmet = require('helmet');
const limiter = require('./utils/limiter');
const error = require('./middlewares/errors');
const { requestLogger, errorLoger } = require('./middlewares/loger');

const app = express();

const { PORT = port, DB_URL = dbUrl } = procces.env;
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
