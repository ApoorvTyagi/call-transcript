const OpenAI = require('openai');
const { openAiApiKey } = require('../config/config');

if (!openAiApiKey) {
    console.error('Error: OpenAI API key is missing. Please check your configuration.');
    process.exit(1);
}

const openai = new OpenAI({ apiKey: openAiApiKey });

async function generateTranscriptContent(language) {
    const prompt = `Generate realistic and natural-sounding sales call transcript in ${language} between a salesperson and a client discussing a tech product. Include timestamps and names along with each statement`;
    
    /* Syntax reference: https://platform.openai.com/docs/api-reference/chat?lang=node.js */
    const response = await openai.chat.completions.create({
        messages: [{ role: "system", content: prompt }],
        model: "gpt-3.5-turbo",
        max_tokens: 1000,
        temperature: 0.2,
    });
    /* Syntax reference ENDS */
    
    return {
        content: response.choices[0].message.content,
        created: response.created
    }
}

async function summarizeTranscriptContent(transcriptContent, language) {
    const prompt = `Summarize key points from this sales call transcript in ${language}. Focus on the main topics discussed, including any action items, decisions, and product details. \n Transcript: "${transcriptContent}" Provide the summary in ${language}, keeping it clear and concise`;

    /* Syntax reference: https://platform.openai.com/docs/api-reference/chat?lang=node.js */
    const response = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "gpt-3.5-turbo",
        max_tokens: 1300,
        temperature: 0.9,
    });
    /* Syntax reference ENDS */
    
    return response.choices[0].message.content;
}

async function answerTranscriptQuestion(content, question, language) {
    const prompt = `Based on the following transcript, answer the question in ${language}: \n Transcript: "${content}" \n Question: "${question}" \n Answer the question in ${language}, providing as much relevant detail as possible`;
    
    /* Syntax reference: https://platform.openai.com/docs/api-reference/chat?lang=node.js */
    const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1250,
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
