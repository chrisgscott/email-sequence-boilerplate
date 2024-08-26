process.removeAllListeners('warning');

const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const databaseConfig = require('../config/databaseConfig');
const routesConfig = require('../config/routesConfig');
const authRoutes = require('../routes/authRoutes');
const sequenceController = require('../controllers/sequenceController');
const authMiddleware = require('../middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

// Connect to MongoDB
mongoose.connect(databaseConfig.uri, databaseConfig.options)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Routes
const emailSequenceRoutes = require('../routes/emailSequenceRoutes');
const sequenceRoutes = require('../routes/sequenceRoutes');

app.use(routesConfig.emailSequencePrefix, emailSequenceRoutes);
app.use(routesConfig.authPrefix, authRoutes);
app.use('/api/sequences', sequenceRoutes);

// Sequence routes
app.post('/api/sequences', authMiddleware, sequenceController.createSequence);
app.get('/api/sequences', authMiddleware, sequenceController.getSequences);
app.delete('/api/sequences/:id', authMiddleware, sequenceController.deleteSequence);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});