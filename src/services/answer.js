const fs = require('fs');
const path = require('path');

const { answerTranscriptQuestion } = require('./openai');
const { updateChatHistory } = require('../database/repository');

async function answerQuestion(fileName, question) {
    try {
        const filePath = path.join(__dirname, `../../${fileName}`);
        /* AI generated validation */
        if (!fs.existsSync(filePath)) {
            console.error(`File not found: ${filePath}`);
            return null;
        }
        /* AI generated code ENDS */

        const transcriptContent = fs.readFileSync(filePath, 'utf-8');
        if (!transcriptContent || typeof transcriptContent !== 'string') {
            console.error('Invalid or empty transcript content.');
            return null;
        }

        if (!question || typeof question !== 'string') {
            console.error('Invalid question input.');
            return null;
        }
    
        const answer = await answerTranscriptQuestion(transcriptContent, question);
        
        console.log(`Answer: ${answer}`);
    
        // Saving chat history
        await updateChatHistory(fileName, {question, answer});
    } catch (error) {
        console.error('Error answering transcript:', error);
    }
}


module.exports = answerQuestion;
