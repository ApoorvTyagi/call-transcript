const fs = require('fs');
const path = require('path');

const { summarizeTranscriptContent } = require('./openai')

async function summarizeTranscript(fileName) {
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

    const summary = await summarizeTranscriptContent(transcriptContent);

    console.log('Summary of the Transcript:', summary);
  } catch (error) {
    console.error('Error summarizing transcript:', error);
  }
}


module.exports = summarizeTranscript;
