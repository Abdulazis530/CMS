const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose')


const usersAuth = require('./routes/auth');
const data = require('./routes/data');
const dataDate = require('./routes/dataDate');
const maps = require('./routes/maps');


const app = express();
mongoose.connect('mongodb://localhost/cmsDb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/api/users', usersAuth);
app.use('/api/data', data);
app.use('/api/datadate', dataDate);
app.use('/api/maps', maps);

module.exports = app;
