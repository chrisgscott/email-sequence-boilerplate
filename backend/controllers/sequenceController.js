const Sequence = require('../models/sequence');

exports.createSequence = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Sequence name is required' });
    }
    const sequence = new Sequence({
      name,
      user: req.user._id
    });
    await sequence.save();
    res.status(201).json(sequence);
  } catch (error) {
    console.error('Error creating sequence:', error);
    res.status(500).json({ message: 'Error creating sequence', error: error.message });
  }
};

exports.getSequences = async (req, res) => {
  try {
    const sequences = await Sequence.find({ user: req.user._id });
    res.json(sequences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteSequence = async (req, res) => {
  try {
    const sequence = await Sequence.findOneAndDelete({ _id: req.params.id, user: req.user._id });
    if (!sequence) {
      return res.status(404).json({ message: 'Sequence not found' });
    }
    res.json({ message: 'Sequence deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};