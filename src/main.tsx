import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "./components/ThemeProvider";

const root = document.getElementById("root");

if (!root) {
  throw new Error("Root container missing in index.html");
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
