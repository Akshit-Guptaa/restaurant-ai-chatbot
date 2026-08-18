import express from "express";
import dotenv from "dotenv";
import path from "path";

import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { createAgent, tool } from "langchain";
import { z } from "zod";

dotenv.config();

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());

const __dirname = path.resolve();

// -------------------------
// Gemini Model
// -------------------------

const model = new ChatGoogleGenerativeAI({
    model: "gemini-2.5-flash",
    maxOutputTokens: 2048,
    temperature: 0.7,
    apiKey: process.env.GOOGLE_API_KEY,
});

// -------------------------
// Restaurant Menu Tool
// -------------------------

const getMenuTool = tool(
    async ({ category }) => {
        const menus = {
            breakfast: "Aloo Paratha, Poha, Masala Chai",
            lunch: "Paneer Butter Masala, Dal Fry, Jeera Rice, Roti",
            dinner: "Veg Biryani, Raita, Salad, Gulab Jamun",
        };

        return (
            menus[category.toLowerCase()] ||
            "No menu found for that category."
        );
    },
    {
        name: "getMenuTool",
        description:
            "Returns today's menu for breakfast, lunch, or dinner. Use this tool when the user asks about the restaurant menu.",
        schema: z.object({
            category: z
                .string()
                .describe("Type of food: breakfast, lunch, or dinner"),
        }),
    }
);

// -------------------------
// AI Agent Setup
// -------------------------

const agent = createAgent({
    model,
    tools: [getMenuTool],
    systemPrompt: "You are a helpful restaurant assistant. Use the menu tool whenever the user asks about breakfast, lunch, or dinner."
});

// -------------------------
// Serve Frontend
// -------------------------

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "index.html"));
});

// -------------------------
// API Routes
// -------------------------

app.post("/api/chat", async (req, res) => {
    try {
        const userInput = req.body.input;
        console.log("User Input:", userInput);

        const response = await agent.invoke({
            messages: [{ role: "user", content: userInput }]
        });

        // Agent output is the content of the last message in the state
        const outputMessage = response.messages[response.messages.length - 1].content;
        
        console.log("Agent Response:", outputMessage);
        res.json({ output: outputMessage });
    } catch (error) {
        console.error("Error generating response:", error);
        res.status(500).json({ output: "Sorry, I encountered an error." });
    }
});

// -------------------------
// Start Server
// -------------------------

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});