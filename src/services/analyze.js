const fs = require('fs');
const path = require('path');

const { summarizeTranscriptContent } = require('./openai')

async function summarizeTranscript(fileName) {
  try {
    const filePath = path.join(__dirname, `../../${fileName}`);
    const transcriptContent = fs.readFileSync(filePath, 'utf-8');

    const summary = await summarizeTranscriptContent(transcriptContent);

    console.log('Summary of the Transcript:', summary);

  } catch (error) {
    console.error('Error summarizing transcript:', error);
  }
}


module.exports = summarizeTranscript;
