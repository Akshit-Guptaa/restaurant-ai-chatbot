# 🍔 BiteBot - Restaurant AI Chatbot

A modern, AI-powered restaurant assistant with a Gen-Z aesthetic. Built with Node.js, Express, Google Gemini, and Langchain.

## 🚀 Tech Stack
- **Frontend**: HTML5, Vanilla CSS (Glassmorphism design), JavaScript (Fetch API)
- **Backend**: Node.js, Express.js
- **AI Integration**: Google Gemini, Langchain
- **Environment**: dotenv

## ✨ Features
- **Modern UI**: Dark mode, frosted glass effects, smooth animations, and a typing indicator.
- **AI Agent**: Utilizes a Langchain Agent equipped with custom tools.
- **Tool Calling**: The bot can dynamically fetch the restaurant menu (breakfast, lunch, dinner) using a custom tool.

## 💻 How to Run Locally

1. Clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file in the root directory and add your Google API Key:
   ```env
   GOOGLE_API_KEY="your_api_key_here"
   ```
4. Start the server:
   ```bash
   node server.js
   ```
5. Open your browser and go to `http://localhost:3000`.

---

## 🧠 Interview Prep Guide (Revision Notes)

Use this section to brush up on the core concepts of this project before a technical interview.

### 1. What is Langchain and why did you use it?
**Answer**: Langchain is a framework designed to simplify the creation of applications using Large Language Models (LLMs). I used it because it provides excellent abstractions for creating **Agents** and giving LLMs access to **Tools**. Instead of writing complex API calls and managing conversation state manually, Langchain handles the routing and tool execution gracefully.

### 2. What is "Tool Calling" (or Function Calling)?
**Answer**: Tool calling allows an LLM to interact with external systems. Instead of the AI just guessing an answer based on its training data, it realizes it needs real-time information (like the restaurant menu). The AI outputs a request to use the `getMenuTool`, the backend executes my JavaScript function to get the menu data, and passes that data back to the AI so it can formulate a final, accurate response.

### 3. How does the Frontend communicate with the Backend?
**Answer**: The frontend uses the native browser `fetch` API to send an asynchronous `POST` request to the backend's `/api/chat` endpoint. The message is sent as a JSON payload. The Express backend receives it, passes it to the Langchain agent, awaits the AI's response, and sends it back to the frontend as JSON.

### 4. How did you handle security for your API Key?
**Answer**: I used the `dotenv` package to load environment variables. The `GOOGLE_API_KEY` is stored in a `.env` file, which is explicitly added to the `.gitignore` file. This ensures the key is never pushed to public repositories like GitHub, keeping my credentials secure.

### 5. How did you design the UI?
**Answer**: I used vanilla CSS with a focus on modern web design principles. I implemented **Glassmorphism** using `backdrop-filter: blur()`, added smooth CSS animations (`@keyframes`), and used radial gradients to create a neon-glow effect on a dark background.
