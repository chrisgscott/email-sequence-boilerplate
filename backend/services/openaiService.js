const OpenAI = require("openai");
const emailConfig = require("../config/emailSequenceConfig");
const openaiConfig = require("../config/openaiConfig");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

exports.generateEmailSequence = async (topic, inputs) => {
  const prompt = emailConfig.promptTemplate(topic, inputs, emailConfig);

  try {
    const chatCompletion = await openai.chat.completions.create({
      model: openaiConfig.model,
      messages: [
        { role: "system", content: openaiConfig.systemMessage },
        { role: "user", content: prompt }
      ],
      max_tokens: openaiConfig.maxTokens,
    });

    if (!chatCompletion.choices || chatCompletion.choices.length === 0) {
      throw new Error('No response from OpenAI API');
    }

    return JSON.parse(chatCompletion.choices[0].message.content);
  } catch (error) {
    console.error('Error generating email sequence:', error);
    if (error.response) {
      console.error(error.response.status, error.response.data);
    }
    throw new Error('Failed to generate email sequence');
  }
};