import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends ThemeType {}
}

export interface ThemeType {
  colors: {
    primary: string;
    primaryHover: string;
    border: string;
    text: string;
    background: string;
    danger: string;
    disabled: string;
  };
  fontSizes: {
    xxs: string;
    xs: string;
    sm: string;
    base: string;
    md: string;
    lg: string;
  };
  fontWeights: {
    regular: number;
    medium: number;
    bold: number;
  };
  spacing: (factor: number) => string;
}
