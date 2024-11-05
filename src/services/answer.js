const { readContentFromFile } = require('../util/fileUtils');
const { answerTranscriptQuestion } = require('./openai');
const { updateChatHistory } = require('../database/repository');

async function answerQuestion(fileName, question, language) {
    try {
        const transcriptContent = readContentFromFile(fileName);
        if (!transcriptContent || typeof transcriptContent !== 'string') {
            console.error('Invalid or empty transcript content.');
            return null;
        }

        if (!question || typeof question !== 'string') {
            console.error('Invalid question input.');
            return null;
        }
    
        const answer = await answerTranscriptQuestion(transcriptContent, question, language);
        
        console.log(`Answer (in ${language}): ${answer}`);
    
        // Saving chat history
        await updateChatHistory(fileName, {question, answer, answerLanguage: language});
    } catch (error) {
        console.error('Error answering transcript:', error);
    }
}


module.exports = answerQuestion;
