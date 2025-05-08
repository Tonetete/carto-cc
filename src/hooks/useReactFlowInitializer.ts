import { useEffect, useState } from "react";
import { useReactFlowStore } from "./useReactFlowStore";

export const useReactFlowInitializer = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    useReactFlowStore.getState().load();
    setInitialized(true);
  }, []);

  return initialized;
};
