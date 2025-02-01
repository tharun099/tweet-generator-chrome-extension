import { GoogleGenerativeAI } from '@google/generative-ai';

export async function generateTweet(
  text: string,
  tone: string,
  length: number
): Promise<string> {
  if (!import.meta.env.VITE_GEMINI_API_KEY) {
    throw new Error('Gemini API key is not configured');
  }

  const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

  try {
    const prompt = `
      Generate a tweet based on the following text: "${text}"
      
      Requirements:
      - Use a ${tone.toLowerCase()} tone
      - Maximum length: ${length} characters
      - Must be engaging and shareable
      - Maintain the core message of the original text
      - Include relevant context
      - Do not use hashtags unless they're crucial
      
      Return only the tweet text, nothing else.
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const tweet = response.text().trim();

    // Ensure the tweet doesn't exceed the maximum length
    return tweet.length > length ? tweet.slice(0, length) : tweet;
  } catch (error) {
    console.error('Gemini API Error:', error);
    throw new Error(
      error instanceof Error 
        ? error.message 
        : 'Failed to generate tweet with Gemini API'
    );
  }
}