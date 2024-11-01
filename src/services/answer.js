const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const TranscriptModel = require('../models/transcript');

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

    // Saving chat history
    const newChat = { question, answer };
    await updateChatHistoryByFileName(fileName, newChat);
}

async function updateChatHistoryByFileName(fileName, newChat) {
  try {
      const updatedTranscript = await TranscriptModel.findOneAndUpdate(
          { fileName },
          { $push: { chatHistory: newChat } },
          { new: true }
      );

      if (!updatedTranscript) {
          console.log(`Transcript with fileName "${fileName}" not found.`);
          return null;
      }

      console.log(`Transcript updated successfully.`);
      return updatedTranscript;
  } catch (error) {
      console.error(`Error updating chat history: ${error.message}`);
  }
}

module.exports = answerQuestion;
