const {GoogleGenAi} = require("@google/genai");
const { model } = require("mongoose");

const  ai = new GoogleGenAi({ apiKey: process.env.GEMINI_API_KEY });

// @desc     Generate text using AI
// @route    POST /api/ai/generate-text
// @access   Private
const generateOutLine = async (requestAnimationFrame, res) => {
    try {

    } catch (error) {
        console.error("Error generating outline", error);
        res
        .status(500)
        .json({ message: "Server error while generating outline" });
    }
};

// desc     Generate content for a chapter
// @route    POST /api/ai/generate-chapter
// @access   Private

const generateChapterContent = async(req, res) => {
    try {
         const {topic, style, numChapters, description} = req.body;

         if(!topic) {
            return res.status(400).json({ message: "Please provide a topic" });
         }

         const prompt = ``;

         const response = await ai.models.generateContent({
            model: "gemini-2.5-flash-lite",
            contents: prompt,
         })

         const text = response.text;

         // Find and extract the JSON array from the response text
         const startIndex = text.indexOf("[");
         const endIndex = text.lastIndexOf("]");

         if(startIndex === -1 || endIndex === -1) {
        console.error("Could not find JSON array in AI response", text);
        return res
        .status(500)
        .json({ message: "Failed to parse AI response, no JSON array found" });
         }

         const jsonString = text.substring(startIndex, end + 1);

         // Validate if the response is valid JSON
         try {
            const chapters = JSON.parse(jsonString);
            res.status(200).json({ outline });
         } catch(e) {
            console.error("Error parsing JSON from AI response", jsonString);
            res.status(500).json({ message: "Failed to generate a valid outline. The AI responce was not valid JSON" });
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
    generateChapterContent
};