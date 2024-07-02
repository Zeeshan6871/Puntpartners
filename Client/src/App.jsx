// src/App.js
import React, { useState } from "react";
import axios from "axios";
import {
  Container,
  TextField,
  Button,
  Typography,
  MenuItem,
  Box,
  Paper,
} from "@mui/material";

const languages = [
  { code: "en", name: "English" },
  { code: "hindi", name: "Hindi" },
  { code: "arabic", name: "Arabic" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  // Add more languages as needed
];

const App = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("hindi");

  const handleTranslate = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/translate", {
        text: inputText,
        fromLanguage,
        toLanguage,
      });
      setTranslatedText(response.data.translatedText);
    } catch (error) {
      console.error("Error translating text", error);
    }
  };

  return (
    <Container maxWidth="md" style={{ marginTop: "50px" }}>
      <Paper elevation={3} style={{ padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Text Translator
        </Typography>
        <TextField
          label="Enter text to translate"
          multiline
          rows={4}
          variant="outlined"
          fullWidth
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Box
          display="flex"
          justifyContent="space-between"
          style={{ marginBottom: "20px" }}
        >
          <TextField
            select
            label="From"
            value={fromLanguage}
            onChange={(e) => setFromLanguage(e.target.value)}
            variant="outlined"
            style={{ marginRight: "10px" }}
            fullWidth
          >
            {languages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="To"
            value={toLanguage}
            onChange={(e) => setToLanguage(e.target.value)}
            variant="outlined"
            style={{ marginLeft: "10px" }}
            fullWidth
          >
            {languages.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
          </TextField>
        </Box>
        <Button
          variant="contained"
          color="primary"
          onClick={handleTranslate}
          fullWidth
        >
          Translate
        </Button>
        <Typography variant="h5" gutterBottom style={{ marginTop: "20px" }}>
          Translated Text
        </Typography>
        <Paper elevation={1} style={{ padding: "10px", minHeight: "100px" }}>
          <Typography variant="body1">{translatedText}</Typography>
        </Paper>
      </Paper>
    </Container>
  );
};

export default App;
