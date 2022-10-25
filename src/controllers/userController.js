const jwt = require('jsonwebtoken');

const { userService } = require('../services');
const loginSchema = require('../validations/users/loginSchema');

const login = async (req, res) => {
  const { error } = loginSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { type, message } = await userService.login(req.body);

  if (type) return res.status(type).json({ message });
  const jwtConfig = {
    expiresIn: '1d',
    algorithm: 'HS256',
  };

  const token = jwt.sign({ ...req.body, admin: true }, process.env.JWT_SECRET, jwtConfig);
  res.status(200).json({ token });
};

module.exports = {
  login,
};