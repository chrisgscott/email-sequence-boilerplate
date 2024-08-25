module.exports = {
    frequency: 'weekly', // Can be 'daily', 'weekly', 'monthly', etc.
    duration: 52, // Number of emails in the sequence
    emailStructure: [
      { name: 'Subject line', type: 'string' },
      { name: 'Email content', type: 'string' },
      { name: 'Scheduled send date', type: 'date' }
    ],
    promptTemplate: (topic, inputs, config) => `
      Generate a ${config.duration}-${config.frequency} email sequence about ${topic}.
      User inputs: ${JSON.stringify(inputs)}
      
      For each email, provide:
      ${config.emailStructure.map((field, index) => `${index + 1}. ${field.name}`).join('\n')}
  
      Return the result as a JSON array.
    `
  };