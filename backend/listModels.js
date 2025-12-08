require("dotenv").config();

async function listModels() {
  try {
    const API_KEY = process.env.GEMINI_API_KEY;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error(`HTTP Error! Status: ${response.status}`);
    }

    const data = await response.json();

    console.log("\nAvailable Models:\n");
    data.models.forEach((model) => {
      console.log(`- ${model.name}`);
    });
  } catch (error) {
    console.error("Error listing models:", error);
  }
}

listModels();