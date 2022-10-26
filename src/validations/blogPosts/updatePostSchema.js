const Joi = require('joi');

const errorMessage = 'Some required fields are missing';

const updatePostSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': errorMessage,
    'string.empty': errorMessage,
  }),
  content: Joi.string().required().messages({
    'any.required': errorMessage,
    'string.empty': errorMessage,
  }),
});

module.exports = updatePostSchema;