
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with the provided key
const genAI = new GoogleGenerativeAI("AIzaSyD6XDMt8pXaMBRm7ePwdXYf2eeut7mJlI0");

export const generateMindMap = async (topic: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Create a comprehensive mind map for the legal topic: ${topic}. 
    Format the response as a JSON object with the following structure:
    {
      "center": "main topic",
      "branches": [
        {
          "topic": "subtopic",
          "children": ["point 1", "point 2", "point 3"]
        }
      ]
    }
    Include at least 5 branches with at least 3-5 points each. Make sure each point is concise and focused.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    // Extract JSON from the response - sometimes Gemini might return extra text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonText = jsonMatch ? jsonMatch[0] : text;
    
    try {
      return JSON.parse(jsonText);
    } catch (e) {
      console.error("Error parsing JSON response:", e);
      console.log("Raw response:", text);
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
    const prompt = `Generate comprehensive, well-structured study notes for the legal topic: ${topic}.
    
    Please format your response with:
    1. Clear headings and subheadings using Markdown (# for main headings, ## for subheadings)
    2. Bullet points for key concepts
    3. Include relevant case law with proper citations
    4. Bold important terms and principles
    5. Include a summary section at the end
    
    Make the notes comprehensive but concise, focusing on clarity and educational value.`;

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
    const prompt = `Provide a comprehensive legal definition and explanation for the term: "${term}".
    
    Format your response with the following sections using Markdown:
    
    # Definition
    [Provide a clear, authoritative definition]
    
    ## Legal Context
    [Explain the legal context and importance]
    
    ## Key Cases
    [List 2-3 important cases with brief explanations]
    
    ## Practical Application
    [Explain how this term is used in legal practice]
    
    ## Related Terms
    [List 3-4 related legal concepts with brief explanations]
    
    Make your explanation clear, precise, and formatted for easy reading.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
