const Joi = require('joi');

const errorMessage = 'Some required fields are missing';

const blogPostSchema = Joi.object({
  title: Joi.string().required().messages({
    'any.required': errorMessage,
    'string.empty': errorMessage,
  }),
  content: Joi.string().required().messages({
    'any.required': errorMessage,
    'string.empty': errorMessage,
  }),
  categoryIds: Joi.array().items(Joi.number()).min(1).required()
  .messages({
    'any.required': errorMessage,
    'string.empty': errorMessage,
  }),
});

module.exports = blogPostSchema;