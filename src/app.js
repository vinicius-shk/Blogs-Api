const express = require('express');

const { userController } = require('./controllers');

const app = express();

app.use(express.json());

app.post('/login', userController.login);

app.post('/user', userController.createUser);

module.exports = app;
