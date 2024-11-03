const generateTranscript = require('./services/transcript');
const summarizeTranscript = require('./services/analyze');
const answerQuestion = require('./services/answer');

const connectDB = require('./database/connection');

/* The idea of using Object.freeze was taken from chatGPT | AI Generated code */
const COMMANDS_ENUM = Object.freeze({
    GENERATE: 'generate',
    SUMMARIZE: 'summarize',
    ANSWER: 'answer',
});
/* AI Generated code ENDS*/

async function main() {
    await connectDB();

    const [,, command, fileName, question] = process.argv;

    if (!command || !Object.values(COMMANDS_ENUM).includes(command)) {
        console.log('Error: Unknown or missing command. Please use "generate", "summarize", or "answer".');
        process.exit(1);
    }

    switch(command) {
        case COMMANDS_ENUM.GENERATE:
            await generateTranscript();
            break;
        case COMMANDS_ENUM.SUMMARIZE:
            await summarizeTranscript(fileName);
            break;
        case COMMANDS_ENUM.ANSWER:
            await answerQuestion(fileName, question);
            break;
        default:
            console.log('Unknown command');
    }
    process.exit();
}

main();
