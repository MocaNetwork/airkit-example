import { ErrorBoundary } from "react-error-boundary";
import { AccountFunctions } from "./AccountFunctions";
import { ContractFunctions } from "./ContractFunctions";
import { SigningFunctions } from "./SigningFunctions";

export const BlockchainFunctions = () => {
  return (
    <div>
      <AccountFunctions />
      <SigningFunctions />
      <ErrorBoundary
        fallbackRender={({ error }) => {
          return (
            <div className="text-red-500 mt-4">
              Blockchain Functions Error: {error?.message}
            </div>
          );
        }}
      >
        <ContractFunctions />
      </ErrorBoundary>
    </div>
  );
};
