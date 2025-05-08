import "./index.css";
import "./xyflow.css";
import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "styled-components";
import { theme } from "../src/styles/theme/theme";
import App from "./App";

const root = document.getElementById("root") as HTMLElement;

if (!root) {
  throw new Error("Root element not found");
}

createRoot(root).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </StrictMode>,
);
