const { Configuration, OpenAIApi } = require("openai");
const emailConfig = require("../config/emailSequenceConfig");
const openaiConfig = require("../config/openaiConfig");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

exports.generateEmailSequence = async (topic, inputs) => {
  const prompt = emailConfig.promptTemplate(topic, inputs, emailConfig);

  try {
    const response = await openai.createChatCompletion({
      model: openaiConfig.model,
      messages: [
        { role: "system", content: openaiConfig.systemMessage },
        { role: "user", content: prompt }
      ],
      max_tokens: openaiConfig.maxTokens,
    });

    if (!response.data.choices || response.data.choices.length === 0) {
      throw new Error('No response from OpenAI API');
    }

    return JSON.parse(response.data.choices[0].message.content);
  } catch (error) {
    console.error('Error generating email sequence:', error);
    if (error.response) {
      console.error(error.response.status, error.response.data);
    }
    throw new Error('Failed to generate email sequence');
  }
};