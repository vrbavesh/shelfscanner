/**
 * Mock Service for Gemini API interactions.
 * Simulates backend delay and returns structured data.
 */

const MOCK_DELAY = 2500; // 2.5s delay to simulate analysis

const MOCK_BOOKS = [
    {
        id: 1,
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-Improvement",
        matchScore: 98,
        matchReason: "Perfectly aligns with your goal for 'productivity'."
    },
    {
        id: 2,
        title: "Deep Work",
        author: "Cal Newport",
        genre: "Productivity",
        matchScore: 92,
        matchReason: "Highly relevant to your interest in focused work."
    },
    {
        id: 3,
        title: "The Psychology of Money",
        author: "Morgan Housel",
        genre: "Finance",
        matchScore: 85,
        matchReason: "Matches your mood for 'learning'."
    },
    {
        id: 4,
        title: "Project Hail Mary",
        author: "Andy Weir",
        genre: "Sci-Fi",
        matchScore: 78,
        matchReason: "A solid choice for an adventurous break."
    }
];

export const analyzeShelf = async (imageFile, preferences) => {
    // Simulate API Environment Check
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) {
        throw new Error("Missing API Configuration");
    }

    console.log("Analyzing shelf with prefs:", preferences);

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // 5% chance of failure to demonstrate error handling
            if (Math.random() > 0.95) {
                reject(new Error("Failed to process image. Please try again."));
            } else {
                // Return sorted, filtered mock data
                // In a real app, we'd filter based on preferences here or on backend
                resolve(MOCK_BOOKS);
            }
        }, MOCK_DELAY);
    });
};
