const mongoose = require('mongoose');

const transcriptSchema = new mongoose.Schema(
    {   
        fileName:  { type: String, index: true },
        content: String,
        contentLanguage: { type: String, default: 'english'},
        chatHistory: [{ question: String, answer: String, answerLanguage: { type: String, default: 'english'} }],
    }, 
    { 
        timestamps: true,
    }
);

module.exports = mongoose.model('Transcript', transcriptSchema);
