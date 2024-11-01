# call-transcript
Momentum.io coding challenge

## Project Description
This application generates, summarizes, and answers questions based on sales call transcripts using OpenAI's API. It saves transcripts to both text files and a MongoDB database for future data retrieval.

The app is structured into separate modules following software engineering principles, making it modular, scalable, and easy to maintain.

## Features
- *Generate Transcript*: Creates a realistic sales call transcript and saves it to MongoDB and as a text file.
- *Summarize Transcript*: Extracts key points from the saved transcript file.
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
1. Clone the repository
```
git clone <repository-url>
cd call-Transcript
```

2. Install dependencies
```
npm i
```

3. Set Up Environment Variables

- Create a .env file in the root directory and add the following variables:
```
MONGODB_URI=<Your MongoDB connection string>
OPENAI_API_KEY=<Your OpenAI API key>
```

4. Start MongoDB
- Make sure MongoDB is running. This can be locally or via a cloud provider like MongoDB Atlas.

5. Run the Application 
- Use the commands below to generate, summarize, or answer questions about a transcript.

## Usage Guide
Run the application with the following commands:

1. Generate Transcript
```
node src/index.js generate
```
- This command generates a transcript and saves it as a file and in the database.

2. Summarize Transcript
```
node src/index.js summarize <fileName>
```
- `<fileName>`: The name of the transcript file you want to summarize. The fileName is also returned by `generateTranscript()` called in previous step

3. Answer Questions
```
node src/index.js answer <fileName> <question>
```

- `<fileName>`: The name of the transcript file you want to query.
- `<question>`: The question you want to ask based on the transcript content.
