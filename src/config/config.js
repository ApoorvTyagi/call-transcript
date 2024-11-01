require('dotenv').config();

module.exports = {
    mongodbUri: process.env.MONGODB_URI,
    openAiApiKey: process.env.OPENAI_API_KEY,
};
