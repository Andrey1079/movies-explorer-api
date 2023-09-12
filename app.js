const procces = require('process');
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const { PORT = '3000', DB_URL = 'mongodb://127.0.0.1:27017/movie-explorer' } = procces.env;
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
});
app.use('/', require('./routes'));

app.listen(PORT);
