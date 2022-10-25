const jwt = require('jsonwebtoken');

const { User } = require('../models');

const errorMessage = 'Something went wrong';

const login = async ({ email, password }) => {
  try {
    const response = await User.findOne({
      where: { email, password },
    });
  
    if (!response) return { type: 400, message: 'Invalid fields' };
  
    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
  
    const token = jwt.sign({ email }, process.env.JWT_SECRET, jwtConfig);
  
    return { type: null, message: token };
  } catch (error) {
    return { type: 500, message: errorMessage };
  }
};

const createUser = async (body) => {
  try {
    const [, created] = await User.findOrCreate({
      where: { email: body.email },
      defaults: body,
    });
    if (!created) return { type: 409, message: 'User already registered' };
    const jwtConfig = {
      expiresIn: '1d',
      algorithm: 'HS256',
    };
    const { email, displayName, image } = body;
    const token = jwt.sign({ email, displayName, image }, process.env.JWT_SECRET, jwtConfig);
  
    if (created) return { type: null, message: token };  
  } catch (error) {
    return { type: 500, message: errorMessage };
  }
};

const getAll = async () => {
  try {
    const message = await User.findAll({ attributes: { exclude: ['password'] } });
    return { type: null, message };
  } catch (error) {
    return { type: 500, message: errorMessage };
  }
};

const getById = async (id) => {
  try {
    const message = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
    if (!message) return { type: 404, message: 'User does not exist' };
    return { type: null, message };
  } catch (error) {
    return { type: 500, message: errorMessage };
  }
};

module.exports = {
  login,
  createUser,
  getAll,
  getById,
};