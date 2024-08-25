const express = require('express');
const router = express.Router();
const emailSequenceController = require('../controllers/emailSequenceController');
const auth = require('../middleware/auth');

router.post('/create', auth, emailSequenceController.createEmailSequence);

module.exports = router;