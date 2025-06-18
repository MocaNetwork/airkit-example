import { createContext } from "react";
import type { LogContextType } from "./LogProvider";

export const LogContext = createContext<LogContextType | undefined>(undefined);
