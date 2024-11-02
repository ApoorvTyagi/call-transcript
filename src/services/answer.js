const fs = require('fs');
const path = require('path');

const { answerTranscriptQuestion } = require('./openai');
const { updateChatHistory } = require('../database/repository');

async function answerQuestion(fileName, question) {
    try {
        const filePath = path.join(__dirname, `../../${fileName}`);
        const transcriptContent = fs.readFileSync(filePath, 'utf-8');
    
        const answer = await answerTranscriptQuestion(transcriptContent, question);
        
        console.log(`Answer: ${answer}`);
    
        // Saving chat history
        await updateChatHistory(fileName, {question, answer});
    } catch (error) {
        console.error('Error answering transcript:', error);
    }
}


module.exports = answerQuestion;
