import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Service to interact with Google Gemini API for bookshelf analysis.
 */

// Initialize the API client
// Note: In a production environment, you should proxy requests through a backend
// to keep your API key secure. For this MVP, we use the client-side key.
const getClient = () => {
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("Missing Gemini API Key. Please make sure VITE_GEMINI_API_KEY is set in .env");
    }
    return new GoogleGenerativeAI(apiKey);
};

export const analyzeShelf = async (imageFile, preferences) => {
    console.log("Analyzing shelf with:", preferences);

    try {
        const client = getClient();
        // Use the new simplified 1.5 flash model if available, or fall back to standard
        const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

        // 1. Convert Image to Base64
        const base64Image = await fileToGenerativePart(imageFile);

        // 2. Construct the Prompt
        const prompt = `
        Role: You are an expert librarian and bibliophile AI.
        
        Task: 
        1. Analyze the attached image of a bookshelf. Identify strictly the visible book titles.
        2. From the identified books, select the best matches based on the user's preferences below.
        3. If no specific mood matches perfectly, suggest the highest quality books found.
        
        User Context:
        - Favorite Genres: ${preferences.genres.join(", ")}
        - Current Mood: ${preferences.mood}
        - Persona: ${preferences.persona}
        ${preferences.authorInfo ? `- Favorite Authors: ${preferences.authorInfo}` : ''}

        Output Format:
        Return ONLY a JSON array. Do not include markdown formatting (like \`\`\`json).
        The array objects must follow this schema:
        [
            {
                "title": "Exact Book Title",
                "author": "Author Name",
                "genre": "The specific genre of the book",
                "matchScore": <number 0-100 representing relevance to user mood/persona>,
                "matchReason": "A 1-sentence explanation of why this fits the '${preferences.mood}' mood and '${preferences.persona}' persona."
            }
        ]
        
        Limit: Return top 3-5 recommendations.
        `;

        // 3. Call API
        const result = await model.generateContent([prompt, base64Image]);
        const response = await result.response;
        const text = response.text();

        console.log("Gemini Raw Response:", text);

        // 4. Parse JSON
        return parseResponse(text);

    } catch (error) {
        console.error("Gemini Analysis Failed:", error);
        throw new Error("Analysis failed: " + (error.message || "Unknown error"));
    }
};

// Helper: Convert File to proper format for Gemini SDK
async function fileToGenerativePart(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result.split(',')[1];
            resolve({
                inlineData: {
                    data: base64Data,
                    mimeType: file.type
                }
            });
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}

// Helper: Robus JSON parsing
function parseResponse(responseText) {
    try {
        // Strip markdown code blocks if present
        let cleanText = responseText.replace(/```json/g, '').replace(/```/g, '').trim();

        const data = JSON.parse(cleanText);

        if (!Array.isArray(data)) {
            throw new Error("API returned invalid format (not an array)");
        }

        return data;
    } catch (e) {
        console.error("JSON Parse Error:", e);
        throw new Error("Failed to parse book recommendations. Please try again.");
    }
}
