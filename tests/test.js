const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const chai = require('chai');
const expect = chai.expect;
/* AI generated imports */
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);
/* AI generated code ENDS */

const TranscriptModel = require('../src/models/transcript');

const generateTranscript = require('../src/services/transcript');
const summarizeTranscript = require('../src/services/analyze');
const answerQuestion = require('../src/services/answer');

let mongoServer;

describe('Transcript Service Tests', function () {
    /* AI Generated */
    this.timeout(15_000);
    let consoleSpy; 

    before(async () => {
        mongoServer = await MongoMemoryServer.create();
        const uri = mongoServer.getUri();
        await mongoose.connect(uri);
        consoleSpy = sinon.spy(console, 'log'); // Spy on console.log to verify output
    });

    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
        consoleSpy.restore();
    });
    /* AI Generated code ENDS */

    describe('Generate Transcript', () => {
        it('should generate a transcript and save it to the database', async () => {
            const fileName = await generateTranscript('english');
            expect(consoleSpy).to.have.been.calledWithMatch(`Transcript generated (in english):`);
            expect(fileName).to.be.a('string');

            const savedTranscript = await TranscriptModel.findOne({ fileName });
            expect(savedTranscript).to.not.be.null;
            expect(savedTranscript.content).to.be.a('string');
        });

        it('should generate a transcript in FRENCH and save it to the database', async () => {
            const fileName = await generateTranscript('french');
            expect(consoleSpy).to.have.been.calledWithMatch('Transcript generated (in french):');
            expect(fileName).to.be.a('string');

            const savedTranscript = await TranscriptModel.findOne({ fileName });
            expect(savedTranscript).to.not.be.null;
            expect(savedTranscript.content).to.be.a('string');
        });
    });

    /* Below 2 test cases are AI generated */
    describe('Summarize Transcript', () => {
        it('should summarize transcript from file', async () => {
            const sampleFileName = 'transcript_1730483421.txt';

            await summarizeTranscript(sampleFileName, 'english');
            
            expect(consoleSpy).to.have.been.calledWithMatch('Summary of the Transcript (in english):');
        });

        it('should summarize in HINDI transcript from file', async () => {
            const sampleFileName = 'transcript_1730483421.txt';

            await summarizeTranscript(sampleFileName, 'hindi');
            
            expect(consoleSpy).to.have.been.calledWithMatch('Summary of the Transcript (in hindi):');
        });
    });

    describe('Answer Question', () => {
        it('should answer a question based on the transcript and update chat history', async () => {
            const fileName = await generateTranscript();
            
            const question = "What product was discussed?";
            
            await answerQuestion(fileName, question, 'english');

            expect(consoleSpy).to.have.been.calledWithMatch("Answer (in english):");

            // Verify that chat history was updated
            const updatedTranscript = await TranscriptModel.findOne({ fileName });
            expect(updatedTranscript.chatHistory.length).to.be.greaterThan(0);
            expect(updatedTranscript.chatHistory[0].question).to.equal(question);
        });

        it('should answer a question int HINDI based on the transcript and update chat history', async () => {
            const fileName = await generateTranscript('english');
            
            const question = "What product was discussed?";
            
            await answerQuestion(fileName, question, 'hindi');

            expect(consoleSpy).to.have.been.calledWithMatch("Answer (in hindi):");

            // Verify that chat history was updated
            const updatedTranscript = await TranscriptModel.findOne({ fileName });
            expect(updatedTranscript.chatHistory.length).to.be.greaterThan(0);
            expect(updatedTranscript.chatHistory[0].question).to.equal(question);
        });
        
    });
    /* AI generated code ends */
});
