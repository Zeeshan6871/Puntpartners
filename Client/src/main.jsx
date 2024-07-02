import React from "react";
import "regenerator-runtime/runtime";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { CssBaseline } from "@mui/material";
import Translator from "./index.jsx";
// import AppWrapper from "./index.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <CssBaseline />
    {/* <App /> */}
    <Translator />
  </React.StrictMode>
);
