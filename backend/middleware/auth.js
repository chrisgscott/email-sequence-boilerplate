const authService = require('../services/authService');
const User = require('../models/user');

module.exports = async (req, res, next) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    if (!token) {
      throw new Error('No token provided');
    }
    const decoded = authService.verifyToken(token);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error('User not found');
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: error.message || 'Please authenticate.' });
  }
};