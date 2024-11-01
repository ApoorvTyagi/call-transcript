const generateTranscript = require('./services/transcript');
const summarizeTranscript = require('./services/analyze');
const answerQuestion = require('./services/question');

/* The idea of using Object.freeze was taken from chatGPT | AI Generated code */
const Commands = Object.freeze({
    GENERATE: 'generate',
    SUMMARIZE: 'summarize',
    ANSWER: 'answer',
});
/* AI Generated code ENDS*/

async function main() {
    const [,, command, fileName, question] = process.argv;

    switch(command) {
        case Commands.GENERATE:
            await generateTranscript();
            break;
        case Commands.SUMMARIZE:
            await summarizeTranscript(fileName);
            break;
        case Commands.ANSWER:
            await answerQuestion(fileName, question);
            break;
        default:
            console.log('Unknown command');
    }
}

main();
