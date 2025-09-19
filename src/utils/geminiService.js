// src/utils/geminiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

// Debug: Log the environment variables
console.log('Environment:', import.meta.env);
console.log('API Key:', import.meta.env.VITE_GEMINI_API_KEY ? 'Key found' : 'Key missing');

// Initialize the Google Generative AI with your API key
const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
if (!apiKey) {
    console.error('No API key found. Please check your .env file.');
}

const genAI = new GoogleGenerativeAI(apiKey);

// Add delay between requests to prevent rate limiting
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const generateSummarySuggestion = async (userInput) => {
  try {
    await delay(1500);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 2000, // Increased for more suggestions
      },
    });
    
    const prompt = `Generate 8 different professional resume summaries based on the following information. 
    Each summary should be unique in style and focus. For each summary:
    1. Make it concise (3-4 lines)
    2. Keep it professional and achievement-oriented
    3. Highlight different key strengths and experiences
    4. Use varied sentence structures and action verbs
    
    Input text: "${userInput}"
    
    Return exactly 8 different summaries, each separated by "---".
    Do not include any numbering or additional text, just the summaries.`;

    let retries = 3;
    let lastError;
    
    while (retries > 0) {
      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // Split the response into individual suggestions
        const suggestions = response.text()
          .split(/---+/g) // Split by separator
          .map(s => s.trim())
          .filter(s => s.length > 0);
        
        return suggestions.slice(0, 8); // Return max 8 suggestions
      } catch (error) {
        lastError = error;
        console.warn(`Attempt ${4 - retries} failed, retrying...`, error);
        retries--;
        await delay(2000 * (4 - retries));
      }
    }
    
    throw lastError;
    
  } catch (error) {
    console.error("Error generating summary suggestion:", error);
    return ["We're having trouble generating suggestions right now. Please try again in a moment."];
  }
};

export const generateExperienceSuggestion = async (position, company, userInput) => {
  try {
    await delay(1500);
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      generationConfig: {
        maxOutputTokens: 2000, // Increased for more suggestions
      },
    });
    
    const prompt = `Generate 8 different professional job descriptions for a ${position} at ${company} 
    based on the following information. For each description:
    1. Create 3-5 bullet points
    2. Focus on different achievements and responsibilities
    3. Use action verbs and quantify results where possible
    4. Vary the style and focus for each version
    
    Input text: "${userInput}"
    
    Return exactly 8 different descriptions, each separated by "---".
    Each description should be a set of bullet points, no additional text.`;

    let retries = 3;
    let lastError;
    
    while (retries > 0) {
      try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        
        // Split the response into individual suggestions
        const suggestions = response.text()
          .split(/---+/g) // Split by separator
          .map(s => s.trim())
          .filter(s => s.length > 0);
        
        return suggestions.slice(0, 8); // Return max 8 suggestions
      } catch (error) {
        lastError = error;
        console.warn(`Attempt ${4 - retries} failed, retrying...`, error);
        retries--;
        await delay(2000 * (4 - retries));
      }
    }
    
    throw lastError;
    
  } catch (error) {
    console.error("Error generating experience suggestion:", error);
    return ["We're having trouble generating suggestions right now. Please try again in a moment."];
  }
};