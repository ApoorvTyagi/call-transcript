const fs = require('fs');
const path = require('path');

const { generateTranscriptContent } = require('./openai');
const { saveTranscript } = require('../database/repository');

async function generateTranscript() {
  try {   
    const { content, created } = await generateTranscriptContent();
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

function saveContentToFile(fileName, transcriptContent) {
  const filePath = path.join(__dirname, `../../${fileName}`);
  fs.writeFileSync(filePath, transcriptContent);

  console.log(`Transcript saved to ${filePath}`);
}

module.exports = generateTranscript;
