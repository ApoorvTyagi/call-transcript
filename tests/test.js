const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
chai.use(sinonChai);

const TranscriptModel = require('../src/models/transcript');

const generateTranscript = require('../src/services/transcript');
const summarizeTranscript = require('../src/services/analyze');
const answerQuestion = require('../src/services/answer');

let mongoServer;

describe('Transcript Service Tests', function () {
    this.timeout(10_000);

    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    describe('Generate Transcript', () => {
        it('should generate a transcript and save it to the database', async () => {
            const fileName = await generateTranscript();
            expect(fileName).to.be.a('string');

            const savedTranscript = await TranscriptModel.findOne({ fileName });
            expect(savedTranscript).to.not.be.null;
            expect(savedTranscript.content).to.be.a('string');
        });
    });

    /* Below 2 test cases are AI generated */
    describe('Summarize Transcript', () => {
        it('should summarize transcript from file', async () => {
            const sampleFileName = 'sample_transcript.txt';
            const sampleContent = "00:00:00 Salesperson: Hello! Can I help you with our tech product?";
            
            require('fs').writeFileSync(sampleFileName, sampleContent);

            // Spy on console.log to verify output
            const consoleSpy = sinon.spy(console, 'log');
            await summarizeTranscript(sampleFileName);
            
            expect(consoleSpy).to.have.been.calledWithMatch('Summary of the Transcript:');

            consoleSpy.restore();
        });
    });

    describe('Answer Question', () => {
        it('should answer a question based on the transcript and update chat history', async () => {
            const fileName = await generateTranscript();
            
            const question = "What product was discussed?";
            
            const consoleSpy = sinon.spy(console, 'log');
            await answerQuestion(fileName, question);

            expect(consoleSpy).to.have.been.calledWithMatch("Answer:");

            // Verify that chat history was updated
            const updatedTranscript = await TranscriptModel.findOne({ fileName });
            expect(updatedTranscript.chatHistory.length).to.be.greaterThan(0);
            expect(updatedTranscript.chatHistory[0].question).to.equal(question);

            consoleSpy.restore();
        });
    });
    /* AI generated code ends */
});
