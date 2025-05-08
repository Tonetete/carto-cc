import React from "react";
import { useReactFlowInitializer } from "@hooks/useReactFlowInitializer";

export const ContainerState: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const initialized = useReactFlowInitializer();

  if (!initialized) return null;

  return <div>{children}</div>;
};
