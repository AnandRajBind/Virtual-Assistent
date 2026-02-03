import axios from "axios";

const geminiResponse = async (prompt) => {
  try {
    const apiUrl =
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent";
    const result = await axios.post(
      apiUrl,
      {
        contents: [
          {
            parts: [{ text: prompt }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY
        }
      }
    );
    // Same structure as Gemini response
    return result.data.candidates[0].content.parts[0].text; 
    // return result.data;
  } catch (error) {
    console.log("Gemini Error:", error.response?.data || error.message);
    throw error;
  }
};
export default geminiResponse;
