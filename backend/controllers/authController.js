const authService = require('../services/authService');

exports.register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    console.log('Registering user:', { email, name }); // Log the registration attempt
    const user = await authService.register(email, password, name);
    console.log('User registered:', user); // Log the registered user
    const token = authService.generateToken(user._id);
    res.status(201).json({ user: { id: user._id, email: user.email, name: user.name }, token });
  } catch (error) {
    console.error('Registration error:', error); // Log any errors
    res.status(400).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const decodedPassword = decodeURIComponent(password);
    console.log('Login attempt:', { email, password: '****' });
    const user = await authService.login(email, decodedPassword);
    const token = authService.generateToken(user._id);
    res.json({ user: { id: user._id, email: user.email, name: user.name }, token });
  } catch (error) {
    console.error('Login error:', error);
    res.status(401).json({ message: error.message });
  }
};