const { generateTranscriptContent } = require('./openai');
const { saveContentToFile } = require('../util/fileUtils');
const { saveTranscript } = require('../database/repository');

async function generateTranscript(language = 'english') {
  try {   
    const { content, created } = await generateTranscriptContent(language);

    if (!content || typeof content !== 'string') {
      throw new Error('Invalid transcript content: content must be a non-empty string.');
    }

    console.log(`Transcript generated (in ${language}):`);
    console.log(content);

    // Saving transcript to text file
    const fileName = `transcript_${created}.txt`;
    saveContentToFile(fileName, content);

    // Save transcript to DB
    await saveTranscript(fileName, content, language);
    
    return fileName;
  } catch (error) {
    console.error('Error generating transcript:', error);
  }
}

module.exports = generateTranscript;
