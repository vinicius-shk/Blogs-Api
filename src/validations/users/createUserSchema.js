const Joi = require('joi');

const createUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  displayName: Joi.string().min(8).required(),
  image: Joi.string(),
});

module.exports = createUserSchema;