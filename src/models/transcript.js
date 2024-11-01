const mongoose = require('mongoose');

const transcriptSchema = new mongoose.Schema(
    {   
        fileName:  { type: String, index: true },
        content: String,
        chatHistory: [{ question: String, answer: String }],
    }, 
    { 
        timestamps: true,
    }
);

module.exports = mongoose.model('Transcript', transcriptSchema);
