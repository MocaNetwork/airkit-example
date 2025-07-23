import { AccountFunctions } from "./AccountFunctions";
import { ContractFunctions } from "./ContractFunctions";
import { SigningFunctions } from "./SigningFunctions";
import { ExperimentFunctions } from "./ExperimentFunctions";

export const BlockchainFunctions = () => {
  return (
    <div>
      <AccountFunctions />
      <SigningFunctions />
      <ContractFunctions />
      <ExperimentFunctions />
    </div>
  );
};
