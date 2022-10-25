const express = require('express');

const { userController } = require('./controllers');

const app = express();

app.use(express.json());

app.post('/login', userController.login);

module.exports = app;
