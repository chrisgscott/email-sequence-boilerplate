const mongoose = require('mongoose');

const emailSequenceSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  topic: { type: String, required: true },
  inputs: { type: Object, required: true },
  emails: [{
    subject: String,
    content: String,
    sentAt: Date,
    scheduledFor: Date
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('EmailSequence', emailSequenceSchema);