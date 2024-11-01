const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function summarizeTranscript(fileName) {
  try {
    const filePath = path.join(__dirname, `../../${fileName}`);

    const transcriptContent = fs.readFileSync(filePath, 'utf-8');

    const prompt = `Summarize and return the key points from the following sales call:\n\n${transcriptContent}`;

    /* Syntax reference: https://platform.openai.com/docs/api-reference/chat?lang=node.js */
    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      max_tokens: 50, // TODO: To be tweaked later
      temperature: 0.7
    });
    /* Syntax reference ENDS */

    const summary = response.choices[0].message.content;

    console.log('Summary of the Transcript:', summary);

  } catch (error) {
    console.error('Error summarizing transcript:', error);
  }
}


module.exports = summarizeTranscript;
