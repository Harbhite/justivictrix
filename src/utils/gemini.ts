
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with the provided key
const genAI = new GoogleGenerativeAI("AIzaSyD6XDMt8pXaMBRm7ePwdXYf2eeut7mJlI0");

export const generateMindMap = async (topic: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Create a mind map for the legal topic: ${topic}. Format the response as a JSON object with the following structure:
    {
      "center": "main topic",
      "branches": [
        {
          "topic": "subtopic",
          "children": ["point 1", "point 2"]
        }
      ]
    }`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    try {
      return JSON.parse(text);
    } catch (e) {
      console.error("Error parsing JSON response:", e);
      return {
        center: topic,
        branches: [{ topic: "Error", children: ["Could not generate mind map. Please try again."] }]
      };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

export const generateNotes = async (topic: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate comprehensive study notes for the legal topic: ${topic}. Include key concepts, important cases, and relevant principles.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

export const getLegalDefinition = async (term: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Provide a comprehensive legal definition and explanation for the term: ${term}. Include:
    1. Definition
    2. Legal context
    3. Important cases (if applicable)
    4. Usage in practice`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
