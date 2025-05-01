
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize the Gemini API with the provided key
const genAI = new GoogleGenerativeAI("AIzaSyD6XDMt8pXaMBRm7ePwdXYf2eeut7mJlI0");

const parseJsonResponse = (text: string) => {
  try {
    // Extract JSON from the response - sometimes Gemini might return extra text
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    const jsonText = jsonMatch ? jsonMatch[0] : text;
    return JSON.parse(jsonText);
  } catch (e) {
    console.error("Error parsing JSON response:", e);
    console.log("Raw response:", text);
    throw e;
  }
};

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
    
    try {
      return parseJsonResponse(text);
    } catch (e) {
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

export const generateLegalCase = async (topic: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a detailed hypothetical case study for the legal topic: "${topic}".
    
    Format your response with the following structure using Markdown:
    
    # Case Study: [Create an appropriate title]
    
    ## Facts
    [Provide a detailed narrative of the factual scenario, including names, dates, and relevant events]
    
    ## Legal Issues
    [Identify and explain the main legal issues and questions presented]
    
    ## Applicable Law
    [Detail the relevant statutes, precedents, and legal principles that apply]
    
    ## Arguments
    ### For the Plaintiff/Prosecution
    [Present compelling legal arguments from this perspective]
    
    ### For the Defendant/Defense
    [Present compelling legal arguments from this perspective]
    
    ## Analysis
    [Provide a balanced analysis of how the law applies to the facts]
    
    ## Likely Outcome
    [Offer an assessment of the probable result and reasoning]
    
    ## Key Takeaways
    [Summarize the important legal principles illustrated by this case]
    
    Make the case study realistic, educational, and clearly formatted.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

export const generateFlashcards = async (topic: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate a set of 10 educational flashcards for studying the legal topic: "${topic}".
    
    Format the response as a JSON array with the following structure:
    [
      {
        "question": "Clear, specific question about the topic",
        "answer": "Comprehensive but concise answer to the question"
      }
    ]
    
    Ensure that:
    1. Questions are specific and focused on testing understanding
    2. Answers are accurate, concise, and educational
    3. The set covers a range of aspects about the topic
    4. Include at least one flashcard about relevant case law if applicable
    
    Make the flashcards suitable for law students preparing for exams.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    try {
      return parseJsonResponse(text);
    } catch (e) {
      return [
        { 
          question: "Error generating flashcards", 
          answer: "Please try again with a different topic." 
        }
      ];
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

export const generateArguments = async (topic: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const prompt = `Generate balanced legal arguments both for and against the position or topic: "${topic}".
    
    Format the response as a JSON object with the following structure:
    {
      "pro": ["Argument 1 in favor of the position", "Argument 2 in favor", "Argument 3 in favor"],
      "contra": ["Argument 1 against the position", "Argument 2 against", "Argument 3 against"]
    }
    
    For each argument:
    1. Be specific and legally sound
    2. Reference relevant legal principles, statutes, or precedents where possible
    3. Consider practical and policy implications
    
    Provide at least 5 strong arguments on each side, ensuring they are balanced in strength and depth.`;

    const result = await model.generateContent(prompt);
    const text = result.response.text();
    
    try {
      return parseJsonResponse(text);
    } catch (e) {
      return {
        pro: ["Could not generate arguments in favor. Please try again."],
        contra: ["Could not generate arguments against. Please try again."]
      };
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};

export const generateCitation = async (citationRequest: any, citationStyle: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    
    const prompt = `Generate a legal citation for the following source using the ${citationStyle} citation style:
    
    Source Type: ${citationRequest.type}
    Title: ${citationRequest.title}
    ${citationRequest.author ? `Author: ${citationRequest.author}` : ''}
    ${citationRequest.year ? `Year: ${citationRequest.year}` : ''}
    ${citationRequest.court ? `Court: ${citationRequest.court}` : ''}
    ${citationRequest.publisher ? `Publisher: ${citationRequest.publisher}` : ''}
    ${citationRequest.journal ? `Journal: ${citationRequest.journal}` : ''}
    ${citationRequest.volume ? `Volume: ${citationRequest.volume}` : ''}
    ${citationRequest.issue ? `Issue: ${citationRequest.issue}` : ''}
    ${citationRequest.pages ? `Pages: ${citationRequest.pages}` : ''}
    ${citationRequest.url ? `URL: ${citationRequest.url}` : ''}
    
    Provide ONLY the formatted citation with no additional explanation or text.`;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};
