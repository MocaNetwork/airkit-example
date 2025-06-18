import { AccountFunctions } from "./AccountFunctions";
import { ContractFunctions } from "./ContractFunctions";
import { SigningFunctions } from "./SigningFunctions";

export const BlockchainFunctions = () => {
  return (
    <div>
      <AccountFunctions />
      <SigningFunctions />
      <ContractFunctions />
    </div>
  );
};
