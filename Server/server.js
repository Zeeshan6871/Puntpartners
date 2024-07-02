const express = require("express");
const cors = require("cors");
const { translateText } = require("./translate");

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

app.post("/api/translate", async (req, res) => {
  const { text, fromLanguage, toLanguage } = req.body;
  try {
    const translatedText = await translateText(text, fromLanguage, toLanguage);
    console.log(translatedText);
    res.json({ translatedText });
  } catch (error) {
    res.status(500).json({ error: "Failed to translate text" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
