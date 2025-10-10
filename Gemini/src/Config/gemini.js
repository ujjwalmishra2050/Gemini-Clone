// src/Config/gemini.js
// -----------------------------------------------------------
// This file runs in your React (Vite) frontend.
// It does NOT talk directly to Google Gemini.
// Instead, it sends a POST request to your backend
// (server.js) which securely handles the API key & CORS.
// -----------------------------------------------------------

/**
 * Sends the user's prompt to the backend, which calls
 * the Google Gemini API securely and returns the result.
 *
 * @param {string} prompt - The text prompt from the user.
 * @returns {Promise<string>} - The generated Gemini response.
 */
export async function run(prompt) {
  try {
    const response = await fetch("http://localhost:5000/api/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Backend error:", errorText);
      throw new Error(`Backend returned status ${response.status}`);
    }

    const data = await response.json();

    // In case backend returns unexpected structure
    if (!data || typeof data.text !== "string") {
      console.warn("Unexpected backend response:", data);
      return "No response text received from Gemini backend.";
    }

    console.log("Gemini backend response:", data.text);
    return data.text;
  } catch (error) {
    console.error("Error fetching from Gemini backend:", error);
    return "Error: Unable to get response from Gemini backend.";
  }
}

export default run;
