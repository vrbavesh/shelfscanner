import { GoogleGenerativeAI } from "@google/generative-ai";

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
        
        const model = client.getGenerativeModel({ model: "gemini-2.5-flash" });

       
        const base64Image = await fileToGenerativePart(imageFile);

   
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

       
        const result = await model.generateContent([prompt, base64Image]);
        const response = await result.response;
        const text = response.text();

        console.log("Gemini Raw Response:", text);

       
        return parseResponse(text);

    } catch (error) {
        console.error("Gemini Analysis Failed:", error);
        throw new Error("Analysis failed: " + (error.message || "Unknown error"));
    }
};


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

function parseResponse(responseText) {
    try {

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
