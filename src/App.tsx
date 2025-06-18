import { useAccount, useDisconnect } from "wagmi";
import { Button } from "./components/common/Button";
import { ConnectButtons } from "./components/ConnectButtons/ConnectButtons";
import { BlockchainFunctions } from "./components/ContractFunctions";
import { EmbedState } from "./components/EmbedState";
import { Logs } from "./components/Logs";
import { usePartner } from "./hooks/usePartner";

export const App = () => {
  const {
    address,
    chainId,
    isConnected,
    isReconnecting,
    isConnecting: isAccountConnecting,
  } = useAccount();
  const { disconnect, isPending: isDisconnecting } = useDisconnect();
  const { partnerId } = usePartner();

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <div className="col-span-1 lg:col-span-2 order-1 lg:order-0">
          <Logs />
          <EmbedState />
        </div>

        <div className="col-span-1 lg:col-span-4">
          <pre className="text-xs bg-gray-100 p-2 rounded-md text-gray-800 max-w-full overflow-x-auto">
            {JSON.stringify(
              {
                partnerId,
                address,
                chainId,
                isAccountConnecting,
                isReconnecting,
                isConnected,
                isDisconnecting,
              },
              null,
              2
            )}
          </pre>

          <div className="mt-4 gap-2">
            {isAccountConnecting ? (
              <Button className="w-full max-w-3xs mx-auto block" disabled>
                Connecting...
              </Button>
            ) : isConnected ? (
              <Button
                className="w-full max-w-3xs mx-auto block"
                onClick={() => disconnect()}
                disabled={isDisconnecting}
                variant="danger"
              >
                {isDisconnecting ? "Logging out..." : "Logout"}
              </Button>
            ) : (
              <div className="w-full">
                <ConnectButtons />
              </div>
            )}
          </div>

          {isConnected && (
            <div className="mt-4">
              {isReconnecting ? "Reconnecting..." : <BlockchainFunctions />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
