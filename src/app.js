const express = require('express');

const { userController } = require('./controllers');
const jwtValidation = require('./middlewares/auth/jwtValidation');

const app = express();

app.use(express.json());

app.get('/user', jwtValidation, userController.getAll);

app.get('/user/:id', jwtValidation, userController.getById);

app.post('/login', userController.login);

app.post('/user', userController.createUser);

module.exports = app;
