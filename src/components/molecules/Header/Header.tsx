import React from "react";
import { TopBar } from "@atoms/TopBar/TopBar";

export const Header = ({ children }: { children: React.ReactNode }) => {
  return <TopBar>{children}</TopBar>;
};
