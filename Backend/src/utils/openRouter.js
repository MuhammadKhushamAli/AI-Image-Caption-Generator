import { OpenRouter } from "@openrouter/sdk";
import dotenv from "dotenv";

dotenv.config({
  path: "./.env",
});

const openRouter = new OpenRouter({
  apiKey: process?.env?.OPEN_ROUTER_API_KEY,
  defaultHeaders: {
    "X-Title": process?.env?.SITE_NAME,
  },
});

export const LLMModel = async (message) => {
  try {
    return await openRouter.chat.send({
      model: "openai/gpt-5.1",
      messages: [
        {
          role: "user",
          content: message,
        },
      ],
      stream: false,
    });
  } catch (error) {
    return null;
  }
};
