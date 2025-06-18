import { createContext } from "react";

type PartnerContextType = {
  partnerId: string;
};

export const PartnerContext = createContext<PartnerContextType | undefined>(
  undefined
);
