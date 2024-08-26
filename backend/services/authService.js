const bcrypt = require('bcryptjs');
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
  console.log('Registration attempt:', { email, password, name });
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('Email already in use');
  }

  const user = new User({ email, password, name });
  await user.save();
  console.log('User saved:', user);
  return user;
};

exports.login = async (email, password) => {
  console.log('Login attempt:', { email, password });
  const user = await User.findOne({ email });
  if (!user) {
    console.log('User not found for email:', email);
    throw new Error('Invalid email or password');
  }
  console.log('Found user:', user);
  const isMatch = await user.comparePassword(password);
  console.log('Password match result:', isMatch);
  if (!isMatch) {
    throw new Error('Invalid email or password');
  }
  console.log('Login successful for user:', user.email);
  return user;
};