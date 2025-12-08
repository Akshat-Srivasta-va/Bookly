// const { GoogleGenAi } = require("@google/genai");

// const ai = new GoogleGenAi({ apiKey: process.env.GEMINI_API_KEY });

const { GoogleGenerativeAI } = require("@google/generative-ai");

const ai = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// @desc     Generate text using AI
// @route    POST /api/ai/generate-text
// @access   Private
const generateOutLine = async (req, res) => {
  try {
    const { topic, style, numChapters, description } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Please provide a topic" });
    }

    const prompt = `You are an expert book outline generator.Create a comprehensive book outline based in the following requirements:
    
    Topic: "${topic}",
    ${description ? `Description: ${description}` : ""}
    Writing Style: ${style}
    Number of Chapters: ${numChapters || 5}

    Requirements:
    1. Generate exactly ${numChapters || 5} chapters.
    2. Each chapter title should be clear, engaging, and follow a logical progression
    3. Each chapter description should be 2-3 sentences explaining what the chapter covers
    4. Ensure chapters build upon each other coherently
    5. Match the ${style} writing style in your titles and descriptions

    Output Format:
    Return ONLY a valid JSON array with no additional text, markdown, or formatting. Each object must have exactly two keys: "title" and "description".
    
    Example structure:
    [
    {   
    "title": "Chapter 1: Introduction to the Topic",
     "description": "A comprehensive overview introducing the main concept. Sets the foundaiton for understanding the subject matter."
},
{
    "title": "Chapter 2: Core Principles",
    "description" : "Explores the fundamental principles and theories. Provides detailed eexamples and real-world applications": 
}
    ]
    Generate the outline now:`;

    // const response = await ai.models.generateContent({
    //   model: "gemini-2.5-flash-lite",
    //   contents: prompt,
    // });

    // const text = response.text;

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Find and extract the JSON array from the response text
    const startIndex = text.indexOf("[");
    const endIndex = text.lastIndexOf("]");

    if (startIndex === -1 || endIndex === -1) {
      console.error("Could not find JSON array in AI response", text);
      return res
        .status(500)
        .json({ message: "Failed to parse AI response, no JSON array found" });
    }

    const jsonString = text.substring(startIndex, endIndex + 1);

    // Validate if the response is valid JSON
    try {
      const outline = JSON.parse(jsonString);
      res.status(200).json({ outline });
    } catch (e) {
      console.error("Error parsing JSON from AI response", jsonString);
      res.status(500).json({
        message:
          "Failed to generate a valid outline. The AI responce was not valid JSON",
      });
    }
  } catch (error) {
    console.error("Error generating outline", error);
    res.status(500).json({ message: "Server error while generating outline" });
  }
};

// desc     Generate content for a chapter
// @route    POST /api/ai/generate-chapter
// @access   Private

const generateChapterContent = async (req, res) => {
  try {
    const { topic, style, numChapters, description } = req.body;

    if (!topic) {
      return res.status(400).json({ message: "Please provide a topic" });
    }

    const prompt = ``;

    // const response = await ai.models.generateContent({
    //   model: "gemini-2.5-flash-lite",
    //   contents: prompt,
    // });

    // const text = response.text;

    const model = ai.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = result.response.text();

    // Find and extract the JSON array from the response text
    const startIndex = text.indexOf("[");
    const endIndex = text.lastIndexOf("]");

    if (startIndex === -1 || endIndex === -1) {
      console.error("Could not find JSON array in AI response", text);
      return res
        .status(500)
        .json({ message: "Failed to parse AI response, no JSON array found" });
    }

    const jsonString = text.substring(startIndex, endIndex + 1);

    // Validate if the response is valid JSON
    try {
      const outline = JSON.parse(jsonString);
      res.status(200).json({ outline });
    } catch (e) {
      console.error("Error parsing JSON from AI response", jsonString);
      res.status(500).json({
        message:
          "Failed to generate a valid outline. The AI responce was not valid JSON",
      });
    }
  } catch (error) {
    console.error("Error generating chapter content", error);
    res
      .status(500)
      .json({ message: "Server error while generating chapter content" });
  }
};

module.exports = {
  generateOutLine,
  generateChapterContent,
};














