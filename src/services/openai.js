const OpenAI = require('openai');
const { openAiApiKey } = require('../config/config');

const openai = new OpenAI({ apiKey: openAiApiKey });

async function generateTranscriptContent() {
    const prompt = "Generate realistic sales call transcript between salesperson and client discussing tech product. Include timestamps & names along with each statement";
    
    /* Syntax reference: https://platform.openai.com/docs/api-reference/chat?lang=node.js */
    const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
        max_tokens: 900,
        temperature: 0.8,
    });
    /* Syntax reference ENDS */
    
    return {
        content: response.choices[0].message.content,
        created: response.created
    }
}

async function summarizeTranscriptContent(transcriptContent) {
    const prompt = `Summarize and return key points from this sales call: ${transcriptContent}`;

    /* Syntax reference: https://platform.openai.com/docs/api-reference/chat?lang=node.js */
    const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        max_tokens: 1200,
        temperature: 0.9,
    });
    /* Syntax reference ENDS */
    
    return response.choices[0].message.content;
}

async function answerTranscriptQuestion(content, question) {
    const prompt = `Using this transcript: ${content}, answer: ${question}`;
    
    /* Syntax reference: https://platform.openai.com/docs/api-reference/chat?lang=node.js */
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1200,
        temperature: 0.9,
    });
    /* Syntax reference ENDS */
    
    return response.choices[0].message.content;
}

module.exports = {
    generateTranscriptContent,
    summarizeTranscriptContent,
    answerTranscriptQuestion,
};
