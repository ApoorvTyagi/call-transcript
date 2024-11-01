const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
  
async function answerQuestion(fileName, question) {

    const filePath = path.join(__dirname, `../../${fileName}`);

    const transcriptContent = fs.readFileSync(filePath, 'utf-8');

    // Create a prompt for summarization
    const prompt = `Transcript:\n${transcriptContent}\n\n using this transcript, give me the answer for the question: ${question}`;

    /* Syntax reference: https://platform.openai.com/docs/api-reference/chat?lang=node.js */
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 50, // TODO: To be tweaked later
      temperature: 0.7,
    });
    /* Syntax reference ENDS */

    const answer = response.choices[0].message.content;

    console.log(`Answer: ${answer}`);
}

module.exports = answerQuestion;
