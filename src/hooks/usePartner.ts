import { useContext } from "react";
import { PartnerContext } from "../contexts/PartnerContext";

export const usePartner = () => {
  const context = useContext(PartnerContext);
  if (context === undefined) {
    throw new Error("usePartner must be used within a PartnerProvider");
  }
  return context;
};
