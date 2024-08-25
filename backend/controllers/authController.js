const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await authService.register(email, password, name);
    const token = authService.generateToken(user._id);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authService.login(email, password);
    const token = authService.generateToken(user._id);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};