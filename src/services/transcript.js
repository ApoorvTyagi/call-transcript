const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

async function generateTranscript() {
  try {
    const prompt = "Generate a realistic sales call transcript between a salesperson and a client discussing a tech product. Include timestamps & names along with each statement";

    /* Syntax reference: https://platform.openai.com/docs/api-reference/chat?lang=node.js */
    const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        max_tokens: 50,
        temperature: 0.7
    });
    /* Syntax reference ENDS */
    
    const transcriptContent = response.choices[0].message.content;

    console.log('Transcript generated:');
    console.log(transcriptContent);

    const fileName = `transcript_${response.created}.txt`;
    const filePath = path.join(__dirname, `../../${fileName}`);
    fs.writeFileSync(filePath, transcriptContent);

    console.log(`Transcript saved to ${filePath}`);
  } catch (error) {
    console.error('Error generating transcript:', error);
  }
}

module.exports = generateTranscript;