import { useContext } from "react";
import { LogContext } from "../contexts/LogContext";

export const useLogging = () => {
  const context = useContext(LogContext);
  if (context === undefined) {
    throw new Error("useLogging must be used within a LogProvider");
  }
  return context;
};
