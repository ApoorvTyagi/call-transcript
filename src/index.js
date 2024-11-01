const generateTranscript = require('./services/transcript');
const summarizeTranscript = require('./services/analyze');

async function main() {
    const fileName = await generateTranscript();
    summarizeTranscript(fileName);
}

main();
