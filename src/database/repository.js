const TranscriptModel = require('../models/transcript');

async function saveTranscript(fileName, content) {
    const newTranscript = new TranscriptModel({ fileName, content });
    await newTranscript.save();
    console.log('Transcript saved to database');
}

async function updateChatHistory(fileName, chatEntry) {
    const updatedTranscript = await TranscriptModel.findOneAndUpdate(
        { fileName },
        { $push: { chatHistory: chatEntry } },
        { new: true }
    );

    if (!updatedTranscript) {
        console.warn(`Transcript with fileName "${fileName}" not found. Chat history was not updated.`);
    } else {
        console.log('Chat history updated successfully');
    }

    return updatedTranscript;
}

module.exports = {
    saveTranscript,
    updateChatHistory,
};
