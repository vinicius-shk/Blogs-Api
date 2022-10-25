const { userService } = require('../services');
const { loginSchema, createUserSchema } = require('../validations/users');

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { type, message } = await userService.login(req.body);

  if (type) return res.status(type).json({ message });

  res.status(200).json({ token: message });
};

const createUser = async (req, res) => {
  const { error } = createUserSchema.validate(req.body);

  if (error) return res.status(400).json({ message: error.details[0].message });

  const { type, message } = await userService.createUser(req.body);

  if (type) return res.status(type).json({ message });

  res.status(201).json({ token: message });
};

const getAll = async (_req, res) => {
  const { type, message } = await userService.getAll();

  if (type) return res.status(type).json({ message });

  res.status(200).json(message);
};

const getById = async (req, res) => {
  const { type, message } = await userService.getById(req.params.id);

  if (type) return res.status(type).json({ message });

  res.status(200).json(message);
};

module.exports = {
  login,
  createUser,
  getAll,
  getById,
};