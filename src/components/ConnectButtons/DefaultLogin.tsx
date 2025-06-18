import { useConnect } from "wagmi";
import { useConfig } from "wagmi";
import { Button } from "../common/Button";

export const DefaultLogin = () => {
  const { connect, isPending: isConnecting } = useConnect();
  const config = useConfig();

  return (
    <div className="mx-auto p-6 bg-white">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Connect with Default Method
      </h2>
      <div className="max-w-md mx-auto">
        <Button
          onClick={() => {
            const airConnector = config.connectors.find(
              (connector) => connector?.isMocaNetwork
            );

            connect({
              connector: airConnector!,
            });
          }}
          disabled={isConnecting}
          className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isConnecting ? (
            <div className="flex items-center justify-center">
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Connecting...
            </div>
          ) : (
            "Connect Wallet"
          )}
        </Button>
      </div>
    </div>
  );
};
