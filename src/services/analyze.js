const { readContentFromFile } = require('../util/fileUtils');
const { summarizeTranscriptContent } = require('./openai');

async function summarizeTranscript(fileName, language) {
  try {
    const transcriptContent = readContentFromFile(fileName);
    if (!transcriptContent || typeof transcriptContent !== 'string') {
      console.error('Invalid or empty transcript content.');
      return null;
    }

    const summary = await summarizeTranscriptContent(transcriptContent, language);

    console.log(`Summary of the Transcript (in ${language}):`, summary);
  } catch (error) {
    console.error('Error summarizing transcript:', error);
  }
}


module.exports = summarizeTranscript;
