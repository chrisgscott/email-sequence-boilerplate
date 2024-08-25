const SibApiV3Sdk = require('sib-api-v3-sdk');
const User = require('../models/user');
const brevoConfig = require('../config/brevoConfig');

const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.BREVO_API_KEY;

const api = new SibApiV3Sdk.TransactionalEmailsApi();

exports.scheduleEmails = async (emailSequence) => {
  const user = await User.findById(emailSequence.userId);
  if (!user) {
    throw new Error('User not found');
  }

  const results = [];

  for (const [index, email] of emailSequence.emails.entries()) {
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
    sendSmtpEmail.subject = email.subject;
    sendSmtpEmail.htmlContent = email.content;
    sendSmtpEmail.sender = { name: brevoConfig.senderName, email: brevoConfig.senderEmail };
    sendSmtpEmail.to = [{ email: user.email }];
    sendSmtpEmail.scheduledAt = new Date(email.scheduledFor).toISOString();

    try {
      await api.sendTransacEmail(sendSmtpEmail);
      results.push({ index, status: 'success' });
    } catch (error) {
      console.error(`Error scheduling email at index ${index}:`, error);
      results.push({ index, status: 'failed', error: error.message });
    }
  }

  const failedEmails = results.filter(result => result.status === 'failed');
  return { results, failedEmails };
};