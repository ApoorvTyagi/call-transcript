const TranscriptModel = require('../models/transcript');

async function saveTranscript(fileName, content) {
    const newTranscript = new TranscriptModel({ fileName, content });
    await newTranscript.save();
    console.log('Transcript saved to database');
}

async function updateChatHistory(fileName, chatEntry) {
    return TranscriptModel.findOneAndUpdate(
        { fileName },
        { $push: { chatHistory: chatEntry } },
        { new: true }
    );
}

module.exports = {
    saveTranscript,
    updateChatHistory,
};
