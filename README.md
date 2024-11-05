# call-transcript
Momentum.io coding challenge

## Project Description
This application generates, summarizes, and answers questions based on sales call transcripts using OpenAI's API. It saves transcripts to both text files and a MongoDB database for future data retrieval.

The application also supports multi-language feature, allowing for the generation, summarization, and answering of call transcripts in the language of your choice.

The app is structured into separate modules following software engineering principles, making it modular, scalable, and easy to maintain.

## Features
- *Generate Transcript*: Creates a realistic sales call transcript and saves it to MongoDB and as a text file to the root directory.
- *Summarize Transcript*: Summarizes & extracts key points from the saved transcript file.
- *Answer Question*: Answers questions based on the transcript content.

## Folder Structure
```
src
├── config
│   └── config.js           # Environment configuration file
├── database
│   ├── connection.js       # MongoDB connection setup
│   └── repository.js       # Database access layer
├── models
│   └── transcript.js       # Mongoose schema for transcripts
├── services
│   ├── analyze.js          # Summarizes transcript content
│   ├── answer.js           # Answers questions based on transcript
│   ├── openai.js           # Wrapper functions for OpenAI API
│   └── transcript.js       # Handles transcript generation and saving
└── index.js                # Main application entry point
tests
└── test.js                 # Test file
.env                        # Environment variables file
```

## Setup Instructions
1. **Clone the Repository**
```
git clone <repository-url>
cd call-Transcript
```

2. **Install Dependencies**
```
npm i
```

3. **Set Up Environment Variables**
```
MONGODB_URI=<Your MongoDB connection string>
OPENAI_API_KEY=<Your OpenAI API key>
```
Create a `.env` file in the root directory and add the above variables in it.

4. **Start MongoDB**

Make sure MongoDB is running. This can be locally or via a cloud provider like MongoDB Atlas.

5. **Run the Application**

Use the commands below to generate, summarize, or answer questions about a transcript.

## Usage Guide
Run the application with the following commands:

1. **Generate Transcript**
```
node src/index.js generate <language>
```
- `<language>`: The language in which you want to generate the transcript.

This command generates a transcript and saves it as a file and in the database.

2. **Summarize Transcript**
```
node src/index.js summarize <language> <fileName>
```
- `<language>`: The language in which you want to generate the summary.
- `<fileName>`: The name of the transcript file you want to summarize. The fileName is also returned by `generateTranscript()` called in previous step.

This will extract all the key points from the given transcript.

3. **Answer Questions**
```
node src/index.js answer <language> <fileName> <question>
```
- `<language>`: The language in which you want to generate the answer for your question.
- `<fileName>`: The name of the transcript file you want to query.
- `<question>`: The question you want to ask based on the transcript content.

This will return an answer for the given question.

## Running Test Cases

To run the test cases, use the following command:

```
npm run test
```

This command runs the test cases specified in `tests/test.js` using Mocha.


## Thought Process and Improvements

- **Problem Breakdown**: Divided the project into four main phases for ease of development:
    - **Transcript Service** - Responsible for generating transcripts and saving them to a text file. ([PR #1](https://github.com/ApoorvTyagi/call-transcript/pull/1))
    - **Analyze Service** - Summarizes the transcript content. ([PR #2](https://github.com/ApoorvTyagi/call-transcript/pull/2))
    - **Answer Service** - Answers questions based on the transcript content. ([PR #3](https://github.com/ApoorvTyagi/call-transcript/pull/3))
    - **Database Layer** - Manages saving transcripts and chat history to a database. ([PR #4](https://github.com/ApoorvTyagi/call-transcript/pull/4))

- **Service Implementation**: Implemented the business logic for each feature within separate files in the `services` folder, ensuring clear separation of responsibilities.

- **OpenAI API Integration**: Utilized OpenAI's official npm library ([openai](https://www.npmjs.com/package/openai)) for API calls, following code examples from their [documentation](https://platform.openai.com/docs/api-reference/chat?lang=node.js). Alternatively, we could have called their APIs directly using `axios`.

- **API Parameters**: After reviewing OpenAI's documentation, configured `max_tokens` and `temperature` parameters to optimize response quality. These values were adjusted based on the specific needs of each feature.

- **Database Choice**: Opted for a NoSQL database (MongoDB) due to the flexibility it provides in schema management. With potential future requirements to add or update keys, NoSQL allows for easier scalability without predefined relations.

- **Transcript Schema**: Defined a `transcript model` in MongoDB with four main fields:
    - `fileName` (Indexed for efficient search),
    - `content` (Stores transcript content),
    - `contentLanguage` (The language in which content is generated),
    - `chatHistory` (An array of question-answer pairs).

- **Testing**: Added test cases for all three main services. Console output verification was achieved by spying on `console.log`, this logic is generated by AI. ([PR #5](https://github.com/ApoorvTyagi/call-transcript/pull/5))

- **Code Refactoring** ([PR #6](https://github.com/ApoorvTyagi/call-transcript/pull/6)): Upon confirming functionality, refactored the code to improve structure and modularity:
    - **Third-party API Calls**: Moved OpenAI-related calls to a dedicated file (`/services/openai.js`).
    - **Business Logic**: Isolated core business logic within separate files in the `services` folder.
    - **Database Logic**: Consolidated database interaction functions in `/database/repository.js`.
    - **Environment Configuration**: Centralized environment variable management in `config.js`. This allows other services to import necessary environment variables directly from `config.js`, ensuring a cleaner setup and easier maintenance.
    - **Modular File Operations** ([PR #11](https://github.com/ApoorvTyagi/call-transcript/pull/11)): Refactored the code to separate file operations into a dedicated utility module (`utils/fileUtils.js`), making file operations reusable across different services.
    
- **Validation and Error Handling** ([PR #10](https://github.com/ApoorvTyagi/call-transcript/pull/10)): Added validation and error handling to improve robustness across modules:
    - **ENV Variable Validation**: Verified the database connection string & openai secret key before processing them. The application will exit with an error message if the any of them fail to exists, preventing further operations.
    - **Command Validation**: Added validation for supported commands to ensure the input command is valid. If an unsupported or missing command is provided, the application will log an error and terminate gracefully.
    - **Argument Checks**: Implemented checks to verify the presence of required arguments (*fileName* for `SUMMARIZE` and `ANSWER`, and *question* for `ANSWER`). If any argument is missing, an error message is shown, and the process exits without executing the command.
    - **File Existence Validation**: Validated the existence of files before attempting to read them, reducing the risk of unhandled errors from missing files in `summarizeTranscript` and `answerQuestion`.

- **Adding support for mutiple languages** ([PR #12](https://github.com/ApoorvTyagi/call-transcript/pull/12)): Integrated a new `language` parameter across commands (`generate`, `summarize`, or `answer`), enabling responses in the specified language.
    - **Service-Level Adjustments**: Updated the `transcript.js`, `analyze.js`, and `answer.js` service functions to utilize the language parameter. OpenAI prompts are dynamically constructed based on the language input to ensure responses in the requested language.
    - **Transcript Schema Enhancements**: Added a `contentLanguage` field to the Transcript schema to track the language in which the transcript was generated. Additionally, an `answerLanguage` field within chatHistory records the language of each answer, ensuring a clear record of multilingual interactions.
    - **Test Cases Enhancement** -  Introduced three new unit tests covering the multi-language scenarios across all commands. These tests validate that each command returns the correct language output.