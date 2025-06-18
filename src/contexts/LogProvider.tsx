import type { ReactNode } from "react";
import { useState } from "react";
import { LogContext } from "./LogContext";

type Log = {
  message: string;
  timestamp: Date;
  type?: "info" | "error" | "success";
} | null;

export interface LogContextType {
  log: Log;
  setLog: (message: string, type?: "info" | "error" | "success") => void;
}

export const LogProvider = ({ children }: { children: ReactNode }) => {
  const [log, setLogState] = useState<Log>(null);

  const setLog = (
    message: string,
    type: "info" | "error" | "success" = "info"
  ) => {
    setLogState({ message, timestamp: new Date(), type });
  };

  return (
    <LogContext.Provider value={{ log, setLog }}>
      {children}
    </LogContext.Provider>
  );
};
