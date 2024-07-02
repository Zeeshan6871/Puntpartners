const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);

const translateText = async (text, fromLanguage, toLanguage) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const prompt = `Translate the following text from ${fromLanguage} to ${toLanguage}: ${text}`;
  const result = await model.generateContent([prompt]);
  console.log(result);
  const translatedText = result.response
    .text()
    .replace(/(\r\n|\n|\r|\\)/gm, " ")
    .trim();

  return translatedText;
};

module.exports = { translateText };
