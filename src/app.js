const express = require('express');

const { userController, categoryController, postController } = require('./controllers');
const jwtValidation = require('./middlewares/auth/jwtValidation');

const app = express();

app.use(express.json());

app.get('/user', jwtValidation, userController.getAll);

app.get('/user/:id', jwtValidation, userController.getById);

app.get('/categories', jwtValidation, categoryController.getAll);

app.get('/post', jwtValidation, postController.getAll);

app.get('/post/:id', jwtValidation, postController.getById);

app.put('/post/:id', jwtValidation, postController.updatePost);

app.post('/login', userController.login);

app.post('/user', userController.createUser);

app.post('/post', jwtValidation, postController.createBlogPost);

app.post('/categories', jwtValidation, categoryController.createCategory);

module.exports = app;
