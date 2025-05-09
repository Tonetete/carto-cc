import React from "react";
import { ThemeProvider } from "styled-components";
import { theme } from "../../src/styles/theme/theme";

export const TestProviders = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);
