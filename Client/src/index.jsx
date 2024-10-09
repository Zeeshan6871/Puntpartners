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
  IconButton,
  Grid,
  AppBar,
  Toolbar,
  CircularProgress,
} from "@mui/material";
import { Mic, VolumeUp, FileCopy } from "@mui/icons-material";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import useClipboard from "react-use-clipboard";
import { createTheme, ThemeProvider } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";

const languages = [
  { code: "en", name: "English" },
  { code: "hindi", name: "Hindi" },
  { code: "arabic", name: "Arabic" },
  { code: "es", name: "Spanish" },
  { code: "fr", name: "French" },
  { code: "de", name: "German" },
  {code:"tel",name:"Telugu"},
  // Add more languages as needed
];

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
    background: {
      default: "#e0f7fa",
    },
  },
  typography: {
    h5: {
      fontWeight: 600,
      color: "#004d40",
    },
    body1: {
      color: "#004d40",
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          padding: "20px",
          backgroundColor: "#ffffff",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: "#00695c",
        },
      },
    },
  },
});

const Translator = () => {
  const [inputText, setInputText] = useState("");
  const [translatedText, setTranslatedText] = useState("");
  const [fromLanguage, setFromLanguage] = useState("en");
  const [toLanguage, setToLanguage] = useState("hindi");
  const [loading, setLoading] = useState(false);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const [textToCopy, setTextToCopy] = useState("");
  const [isCopied, setCopied] = useClipboard(textToCopy, {
    successDuration: 1000,
  });

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  const handleTranslate = async () => {
    if (!inputText && !transcript) {
      return toast.error("Text required for translate");
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "https://puntpartners.onrender.com/api/translate",
        {
          text: inputText || transcript,
          fromLanguage,
          toLanguage,
        }
      );
      setTranslatedText(response.data.translatedText);
      toast.success("Translation successful!");
    } catch (error) {
      console.error("Error translating text", error);
      toast.error("Error translating text");
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = () => {
    if (translatedText) {
      setCopied(translatedText);
      toast.success("Copied to clipboard!");
    } else {
      toast.info("First Translate");
    }
  };

  const handleReset = () => {
    resetTranscript();
    setInputText("");
    setTranslatedText("");
    toast.info("Transcript reset!");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container style={{ marginTop: "50px" }}>
        <ToastContainer />
        <Paper elevation={3}>
          <AppBar position="static" style={{ marginBottom: "20px" }}>
            <Toolbar>
              <Typography variant="h5" color="inherit">
                Speech to Text Converter and Translator
              </Typography>
            </Toolbar>
          </AppBar>
          <Grid
            display={"flex"}
            justifyContent={"center"}
            alignItems={"center"}
            gap={3}
          >
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  label="Enter text to translate"
                  multiline
                  rows={4}
                  variant="outlined"
                  fullWidth
                  value={inputText || transcript}
                  onChange={(e) => {
                    setInputText(e.target.value);
                    resetTranscript();
                  }}
                  style={{ marginBottom: "20px" }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  label="From"
                  value={fromLanguage}
                  onChange={(e) => setFromLanguage(e.target.value)}
                  variant="outlined"
                  fullWidth
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={6}>
                <TextField
                  select
                  label="To"
                  value={toLanguage}
                  onChange={(e) => setToLanguage(e.target.value)}
                  variant="outlined"
                  fullWidth
                >
                  {languages.map((lang) => (
                    <MenuItem key={lang.code} value={lang.code}>
                      {lang.name}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid
                item
                xs={12}
                style={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleTranslate}
                  style={{ marginRight: "10px" }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : "Translate"}
                </Button>
                <IconButton
                  color="primary"
                  onClick={SpeechRecognition.startListening}
                  style={{ marginRight: "10px" }}
                >
                  <Mic />
                </IconButton>
                <IconButton color="primary" onClick={() => {}}>
                  <VolumeUp />
                </IconButton>
              </Grid>
            </Grid>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Typography variant="h5" gutterBottom>
                  Translated Text
                </Typography>
                <Paper
                  elevation={1}
                  style={{
                    padding: "10px",
                    minHeight: "100px",
                    cursor: "pointer",
                  }}
                  onClick={() => setTextToCopy(translatedText)}
                >
                  <Typography variant="body1">{translatedText}</Typography>
                </Paper>
              </Grid>
              <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "20px",
                }}
              >
                <Button variant="contained" onClick={handleCopy}>
                  {isCopied ? "Copied!" : "Copy to clipboard"}
                  <FileCopy />
                </Button>
                <Button variant="contained" onClick={handleReset}>
                  Reset
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Translator;
