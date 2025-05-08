import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    primary: "#0077ff",
    primaryHover: "#005fd1",
    border: "#ccc",
    text: "#333",
    background: "#fff",
    danger: "#e53935",
    disabled: "#ccc",
  },
  fontSizes: {
    xxs: "8px",
    xs: "10px",
    sm: "12px",
    base: "14px",
    md: "16px",
    lg: "20px",
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    bold: 700,
  },
  spacing: (factor: number) => `${factor * 8}px`,
};
