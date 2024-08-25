const jwt = require('jsonwebtoken');
const User = require('../models/user');
const authConfig = require('../config/authConfig');

exports.generateToken = (userId) => {
  return jwt.sign({ id: userId }, authConfig.jwtSecret, { expiresIn: authConfig.jwtExpiresIn });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, authConfig.jwtSecret);
};

exports.register = async (email, password, name) => {
  const user = new User({ email, password, name });
  await user.save();
  return user;
};

exports.login = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid email or password');
  }
  return user;
};