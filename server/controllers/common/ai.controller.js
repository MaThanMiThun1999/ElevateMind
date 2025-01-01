const express = require("express");
const axios = require("axios");
const fs = require("fs");
const path = require("path"); 
const { APP_NAME } = require("../../config/envConfig");
const formatTime = require("../../utils/dateFormatter");
const app = express();
app.use(express.json());
const loadSystemPrompt = (filePathDir = "../knowledge/SYSTEM_INSTRUCTIONS.txt") => {
  const filePath = path.join(__dirname, filePathDir); // Construct the full path to the file
  console.log("filePath: ", filePath);

  // Check if the CUSTOM_INSTRUCTIONS.txt file exists
  if (!fs.existsSync(filePath)) {
    console.error("System prompt file is missing: SYSTEM_INSTRUCTIONS.txt");
    return `
      You are an AI assistant with expert knowledge in ${APP_NAME}. 
      You must only provide answers based on the following knowledge base:
      If the user asks something outside this scope, politely let them know you can only answer based on ${APP_NAME}-related information.
    `;
  }

  try {
    const data = fs.readFileSync(filePath, "utf8");
    console.log("System instructions are loaded from SYSTEM_INSTRUCTIONS.txt");
    return data;
  } catch (err) {
    console.error("Error reading system prompt file:", err);
    return `
      You are an AI assistant with expert knowledge in ${APP_NAME}. 
      You must only provide answers based on the following knowledge base:
      If the user asks something outside this scope, politely let them know you can only answer based on ${APP_NAME}-related information.
    `;
  }
};

const SYSTEM_INSTRUCTIONS = loadSystemPrompt("../../knowledge/SYSTEM_INSTRUCTIONS.txt");

const INTENTS = loadSystemPrompt("../../knowledge/intents.json");

// Define the Pollinations API URL.
const apiUrl = "https://text.pollinations.ai/";

let chatHistory = [];

const sendChat = async (req, res) => {
  try {
    const {
      message,
      seed = 42,
      model = "openai",
      temperature = 0.7,
      max_tokens = 100000000,
      top_p = 1.0,
      frequency_penalty = 0.0,
      presence_penalty = 0.0,
      stop = ["\n"],
      response_format = "json_object",
      jsonMode = true, // Added jsonMode
    } = req.body;

    // Validate the input message
    if (!message || typeof message !== "string") {
      return res.status(400).json({
        error: "Invalid 'message' input. It must be a non-empty string.",
      });
    }

    INTENTS.replace(/^\s+|\s+$/g, "");

    const instructionsWithUser = SYSTEM_INSTRUCTIONS.replace("[INTENTS.JSON]", INTENTS);

    console.log("Instructions after replacement:", instructionsWithUser);

    chatHistory.push({
      role: "system",
      content: instructionsWithUser,
    });

    chatHistory.push({ role: "user", content: message });

    const data = {
      messages: chatHistory,
      model,
      temperature,
      max_tokens,
      top_p,
      frequency_penalty,
      presence_penalty,
      stop,
      seed,
      response_format,
    };

    console.log("Request Body to Pollinations API: ", JSON.stringify(data, null, 2));

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await axios.post(apiUrl, data, { headers });

    console.log("Pollinations API response: ", JSON.stringify(response.data, null, 2));

    const botResponse = response.data;
    chatHistory.push({
      role: "assistant",
      content: JSON.stringify(botResponse), 
    });

    const timestamp = formatTime();
    console.log("timestamp: ", timestamp);

    const formattedResponse = {
      success: true,
      data: botResponse,
      message: "BOT RESPONSE RECEIVED",
      model,
      seed,
      role: "assistant",
      timestamp,
      //   history: chatHistory.map((entry) => entry.content),
      jsonMode,
    };

    res.json(formattedResponse);
  } catch (error) {
    console.error("Error handling chat:", error.message);

    if (error.response && error.response.data) {
      return res.status(error.response.status).json({ error: error.response.data });
    }
    res.status(500).json({ error: "Internal server error." });
  }
};

// Endpoint to clear chat history
app.post("/clearall", (req, res) => {
  chatHistory = [];
  res.json({ message: "Chat history cleared." });
});

// Register the endpoints
app.post("/chat", sendChat);

module.exports = app;

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
