import { useAccount, useBalance } from "wagmi";
import { useAirkit } from "../../hooks/useAirkit";
import { isUrl } from "../../utils";
import { Button } from "../common/Button";
import { useLogging } from "../../hooks/useLogging";
import { useState } from "react";

export const AccountFunctions = () => {
  const { airService } = useAirkit();
  const { addresses, address } = useAccount();
  const { data: balance } = useBalance({ address });
  const { setLog } = useLogging();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const setLoading = (key: string, loading: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [key]: loading }));
  };

  const getUserInfo = async () => {
    try {
      const info = await airService!.getUserInfo();
      setLog(
        `User info retrieved successfully: ${JSON.stringify(info)}`,
        "success"
      );
    } catch (error) {
      setLog(`Failed to get user info: ${error}`, "error");
    }
  };

  const getAccounts = () => {
    if (!addresses?.length) {
      setLog("No accounts found", "error");
      return;
    }
    setLog(
      `Found ${addresses.length} accounts: ${addresses.join(", ")}`,
      "success"
    );
  };

  const getAccountBalance = () => {
    if (!balance) {
      setLog("Could not fetch balance", "error");
      return;
    }
    setLog(
      `Account balance: ${balance.formatted} ${balance.symbol}`,
      "success"
    );
  };

  const preloadWallet = async () => {
    try {
      const result = await airService!.preloadWallet();
      setLog(
        `Wallet preloaded successfully: ${JSON.stringify(result)}`,
        "success"
      );
    } catch (error) {
      setLog(`Failed to preload wallet: ${error}`, "error");
    }
  };

  const deploySmartAccount = async () => {
    try {
      const result = await airService!.deploySmartAccount();
      setLog(
        `Smart account deployed successfully: ${JSON.stringify(result)}`,
        "success"
      );
    } catch (error) {
      setLog(`Failed to deploy smart account: ${error}`, "error");
    }
  };

  const isSmartAccountDeployed = async () => {
    try {
      const result = await airService!.isSmartAccountDeployed();
      setLog(`Smart account deployment status: ${result}`, "info");
    } catch (error) {
      setLog(`Failed to check smart account deployment: ${error}`, "error");
    }
  };

  const setupMfa = async () => {
    try {
      await airService!.setupOrUpdateMfa();
      setLog(`MFA setup successful`, "success");
    } catch (error) {
      setLog(`Failed to setup MFA: ${error}`, "error");
    }
  };

  const claimAirId = async () => {
    try {
      const result = await airService!.claimAirId();
      setLog(
        `Air ID claimed successfully: ${JSON.stringify(result)}`,
        "success"
      );
    } catch (error) {
      setLog(`Failed to claim Air ID: ${error}`, "error");
    }
  };

  const gotoPartner = async () => {
    const url = prompt("Enter the URL of the partner");
    if (!url || !isUrl(url)) {
      setLog("No URL provided or invalid URL", "error");
      return;
    }

    setLog(`Attempting to connect to partner: ${url}`, "info");
    try {
      const result = await airService!.goToPartner(url);
      setLog(
        `Successfully connected to partner: ${JSON.stringify(result)}`,
        "success"
      );
    } catch (error) {
      setLog(`Failed to connect to partner: ${error}`, "error");
    }
  };

  const getAccessToken = async () => {
    try {
      const token = await airService!.getAccessToken();
      setLog(
        `Access token retrieved successfully: ${JSON.stringify(token)}`,
        "success"
      );
    } catch (error) {
      setLog(`Failed to get access token: ${error}`, "error");
    }
  };

  const ACCOUNT_FUNCTIONS: Record<string, () => Promise<void> | void> = {
    "Get User Info": getUserInfo,
    "Get Accounts": getAccounts,
    "Get Account Balance": getAccountBalance,
    "Preload Wallet": preloadWallet,
    "Deploy Smart Account": deploySmartAccount,
    "Is Smart Account Deployed": isSmartAccountDeployed,
    "Setup or Update MFA": setupMfa,
    "Claim Air ID": claimAirId,
    "Go to Partner": gotoPartner,
    "Get Access Token": getAccessToken,
  };

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-2xl font-bold">Account Functions</h2>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(ACCOUNT_FUNCTIONS).map(([key, value]) => (
          <Button
            key={key}
            onClick={async () => {
              setLoading(key, true);
              try {
                await value();
              } finally {
                setLoading(key, false);
              }
            }}
            variant="outline"
            disabled={loadingStates[key]}
          >
            {loadingStates[key] ? "Loading..." : key}
          </Button>
        ))}
      </div>
    </div>
  );
};
