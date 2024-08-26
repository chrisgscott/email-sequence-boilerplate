const express = require('express');
const router = express.Router();
const sequenceController = require('../controllers/sequenceController');
const authMiddleware = require('../middleware/auth');

router.post('/', authMiddleware, sequenceController.createSequence);
router.get('/', authMiddleware, sequenceController.getSequences);
router.delete('/:id', authMiddleware, sequenceController.deleteSequence);

module.exports = router;
