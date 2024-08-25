const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const databaseConfig = require('../config/databaseConfig');
const routesConfig = require('../config/routesConfig');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(databaseConfig.uri, databaseConfig.options)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const emailSequenceRoutes = require('../routes/emailSequenceRoutes');
const authRoutes = require('../routes/authRoutes');

app.use(routesConfig.emailSequencePrefix, emailSequenceRoutes);
app.use(routesConfig.authPrefix, authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});