// config.js
import 'dotenv/config';

// Export the GEMINI_API_KEY safely
export const GEMINI_API_KEY = process.meta.env.VITE_GEMINI_API_KEY;

if (!GEMINI_API_KEY) {
  throw new Error('❌ Missing GEMINI_API_KEY in environment variables');
}
