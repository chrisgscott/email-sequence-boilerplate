const EmailSequence = require('../models/emailSequence');
const openaiService = require('../services/openaiService');
const brevoService = require('../services/brevoService');

exports.createEmailSequence = async (req, res) => {
  try {
    const { topic, inputs } = req.body;
    const userId = req.user._id; // Get userId from authenticated user

    // Input validation
    if (!topic || !inputs) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (typeof topic !== 'string' || topic.length < 3) {
      return res.status(400).json({ message: 'Invalid topic' });
    }

    if (typeof inputs !== 'object' || Object.keys(inputs).length === 0) {
      return res.status(400).json({ message: 'Invalid inputs' });
    }

    // Generate email sequence using OpenAI
    const emails = await openaiService.generateEmailSequence(topic, inputs);

    if (!Array.isArray(emails) || emails.length === 0) {
      throw new Error('Failed to generate email sequence');
    }

    // Create new email sequence in database
    const emailSequence = new EmailSequence({
      userId,
      topic,
      inputs,
      emails: emails.map(email => ({
        subject: email.subject,
        content: email.content,
        scheduledFor: email.scheduledFor
      }))
    });

    // Schedule emails with Brevo
    const { results, failedEmails } = await brevoService.scheduleEmails(emailSequence);
    emailSequence.schedulingResults = results;
    if (failedEmails.length > 0) {
      emailSequence.schedulingErrors = failedEmails;
      await emailSequence.save();
      return res.status(207).json({ 
        message: 'Email sequence created but some emails failed to schedule', 
        emailSequence,
        schedulingErrors: failedEmails 
      });
    }
    await emailSequence.save();

    res.status(201).json(emailSequence);
  } catch (error) {
    console.error('Error creating email sequence:', error);
    res.status(500).json({ message: 'Error creating email sequence', error: error.message });
  }
};