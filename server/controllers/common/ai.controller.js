const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const fs = require('fs');
const path = require('path');
const { APP_NAME, GEMINI_API_KEY } = require('../../config/envConfig');
const formatTime = require('../../utils/dateFormatter');
require('dotenv').config();

const app = express();
app.use(express.json());

const API_KEY = GEMINI_API_KEY;

if (!API_KEY) {
  console.error(
    'GEMINI_API_KEY is not set in environment variables. Please set the API KEY in the .env file.'
  );
  process.exit(1);
}

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

// Function to load system prompt
const loadSystemPrompt = (
  filePathDir = '../knowledge/SYSTEM_INSTRUCTIONS.txt'
) => {
  const filePath = path.join(__dirname, filePathDir); // Construct the full path to the file
  console.log('filePath: ', filePath);

  // Check if the SYSTEM_INSTRUCTIONS.txt file exists
  if (!fs.existsSync(filePath)) {
    console.error('System prompt file is missing: SYSTEM_INSTRUCTIONS.txt');
    return `
      You are an AI assistant with expert knowledge in ${APP_NAME}. 
      You must only provide answers based on the following knowledge base:
      If the user asks something outside this scope, politely let them know you can only answer based on ${APP_NAME}-related information.
    `;
  }

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    console.log('System instructions are loaded from SYSTEM_INSTRUCTIONS.txt');
    return data;
  } catch (err) {
    console.error('Error reading system prompt file:', err);
    return `
      You are an AI assistant with expert knowledge in ${APP_NAME}. 
      You must only provide answers based on the following knowledge base:
      If the user asks something outside this scope, politely let them know you can only answer based on ${APP_NAME}-related information.
    `;
  }
};

const SYSTEM_INSTRUCTIONS = loadSystemPrompt(
  '../../knowledge/SYSTEM_INSTRUCTIONS.txt'
);

const INTENTS = loadSystemPrompt('../../knowledge/intents.json');

let chatHistory = [];

const sendChat = async (req, res) => {
  try {
    const {
      message,
      temperature = 0.7,
      max_tokens = 100000000,
      top_p = 1.0,
      jsonMode = true, // Added jsonMode
    } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({
        error: "Invalid 'message' input. It must be a non-empty string.",
      });
    }

    INTENTS.replace(/^\s+|\s+$/g, '');

    const instructionsWithUser = SYSTEM_INSTRUCTIONS.replace(
      '[INTENTS.JSON]',
      INTENTS
    );

    console.log('Instructions after replacement:', instructionsWithUser);

    chatHistory.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const geminiChat = model.startChat({
      history: chatHistory,
      generationConfig: {
        temperature: temperature,
        maxOutputTokens: max_tokens,
        topP: top_p,
      },
    });

    const geminiResponse = await geminiChat.sendMessage(
      instructionsWithUser.replace('[USERMESSAGES]', message)
    );
    const botResponse = await geminiResponse.response.text();

    chatHistory.push({
      role: 'model',
      parts: [{ text: botResponse }],
    });

    const timestamp = formatTime();
    console.log('timestamp: ', timestamp);

    const formattedResponse = {
      success: true,
      data: botResponse,
      message: 'BOT RESPONSE RECEIVED',
      model: 'gemini-pro',
      role: 'assistant',
      timestamp,
      jsonMode,
    };

    res.json(formattedResponse);
  } catch (error) {
    console.error('Error handling chat:', error);
    if (error.response && error.response.data) {
      return res
        .status(error.response.status)
        .json({ error: error.response.data });
    }
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Endpoint to clear chat history
app.post('/clearall', (req, res) => {
  chatHistory = [];
  res.json({ message: 'Chat history cleared.' });
});

// Register the endpoints
app.post('/chat', sendChat);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
