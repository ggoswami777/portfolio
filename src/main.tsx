import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./components/ThemeProvider";
import { LanguageProvider } from "./components/LanguageContext";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root container missing in index.html");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <LanguageProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
    </LanguageProvider>
    
  </React.StrictMode>,
);
