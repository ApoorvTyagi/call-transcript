const { generateTranscriptContent } = require('./openai');
const { saveContentToFile } = require('../util/fileUtils');
const { saveTranscript } = require('../database/repository');

async function generateTranscript() {
  try {   
    const { content, created } = await generateTranscriptContent();

    if (!content || typeof content !== 'string') {
      throw new Error('Invalid transcript content: content must be a non-empty string.');
    }

    console.log('Transcript generated:');
    console.log(content);

    // Saving transcript to text file
    const fileName = `transcript_${created}.txt`;
    saveContentToFile(fileName, content);

    // Save transcript to DB
    await saveTranscript(fileName, content);
    
    return fileName;
  } catch (error) {
    console.error('Error generating transcript:', error);
  }
}

module.exports = generateTranscript;
