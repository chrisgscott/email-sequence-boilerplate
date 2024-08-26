const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  emails: [{
    subject: String,
    body: String,
    delay: Number
  }]
}, { timestamps: true });

module.exports = mongoose.model('Sequence', sequenceSchema);