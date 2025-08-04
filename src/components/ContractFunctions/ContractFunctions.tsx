import { multicall } from "@wagmi/core";
import { useMemo, useState } from "react";
import { encodeFunctionData, formatEther, parseAbi, parseUnits } from "viem";
import {
  useAccount,
  useChainId,
  useConfig,
  useEstimateGas,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { useLogging } from "../../hooks/useLogging";
import {
  MOCK_ERC20_CONTRACT,
  MOCK_ERC721_CONTRACT,
} from "../../utils/constants";
import { Button } from "../common/Button";

export const ContractFunctions = () => {
  const { setLog } = useLogging();
  const { address } = useAccount();
  const config = useConfig();
  const [loadingStates, setLoadingStates] = useState<Record<string, boolean>>(
    {}
  );

  const setLoading = (key: string, loading: boolean) => {
    setLoadingStates((prev) => ({ ...prev, [key]: loading }));
  };
  const chainId = useChainId();

  const data = useMemo(
    () =>
      encodeFunctionData({
        abi: parseAbi(MOCK_ERC20_CONTRACT(chainId).abi),
        functionName: "transfer",
        args: [address, parseUnits("10", 18)],
      }),
    [address, chainId]
  );

  const { refetch: refetchGasEstimate } = useEstimateGas({
    data,
    to: "0x0000000000000000000000000000000000000000",
    value: BigInt(0),
    query: {
      enabled: false,
    },
  });

  const { writeContractAsync } = useWriteContract();
  const { refetch: refetchErc20Balance } = useReadContract({
    address: MOCK_ERC20_CONTRACT(chainId).address,
    abi: parseAbi(MOCK_ERC20_CONTRACT(chainId).abi),
    functionName: "balanceOf",
    args: [address],
  });
  const { refetch: refetchErc721Balance } = useReadContract({
    address: MOCK_ERC721_CONTRACT(chainId).address,
    abi: parseAbi(MOCK_ERC721_CONTRACT(chainId).abi),
    functionName: "balanceOf",
    args: [address],
  });

  const estimateGasForTransferTokenFn = async () => {
    try {
      const result = await refetchGasEstimate();
      setLog(`Gas estimate: ${result.data}`, "info");
    } catch (error) {
      setLog(`Error estimating gas: ${error}`, "error");
    }
  };

  const mintMockTokenFn = async () => {
    try {
      const result = await writeContractAsync({
        address: MOCK_ERC20_CONTRACT(chainId).address,
        abi: parseAbi(MOCK_ERC20_CONTRACT(chainId).abi),
        functionName: "mint",
        args: [address, parseUnits("10", 18)],
      });
      setLog(`Minted token: ${result}`, "info");
    } catch (error) {
      setLog(`Error minting token: ${error}`, "error");
    }
  };

  const transferTokenFn = async () => {
    try {
      const result = await writeContractAsync({
        address: MOCK_ERC20_CONTRACT(chainId).address,
        abi: parseAbi(MOCK_ERC20_CONTRACT(chainId).abi),
        functionName: "transfer",
        args: [address, parseUnits("10", 18)],
      });
      setLog(`Transferred token: ${result}`, "info");
    } catch (error) {
      setLog(`Error transferring token: ${error}`, "error");
    }
  };

  const balanceOfTokenFn = async () => {
    try {
      const { data: result } = await refetchErc20Balance();
      if (typeof result !== "bigint") {
        setLog("No balance of token", "info");
        return;
      }
      setLog(`Balance of token: ${formatEther(result)}`, "info");
    } catch (error) {
      setLog(`Error getting balance: ${error}`, "error");
    }
  };

  const mintMockERC721Fn = async () => {
    try {
      const result = await writeContractAsync({
        address: MOCK_ERC721_CONTRACT(chainId).address,
        abi: parseAbi(MOCK_ERC721_CONTRACT(chainId).abi),
        functionName: "safeMint",
        args: [address],
      });
      setLog(`Minted token: ${result}`, "info");
    } catch (error) {
      setLog(`Error minting token: ${error}`, "error");
    }
  };

  const balanceOfERC721Fn = async () => {
    try {
      const { data: result } = await refetchErc721Balance();
      if (typeof result !== "bigint") {
        setLog("No balance of token", "info");
        return;
      }
      setLog(`Balance of token: ${result}`, "info");
    } catch (error) {
      setLog(`Error getting balance: ${error}`, "error");
    }
  };

  const multicallFn = async () => {
    try {
      const result = await multicall(config, {
        contracts: [
          {
            address: MOCK_ERC20_CONTRACT(chainId).address,
            abi: parseAbi(MOCK_ERC20_CONTRACT(chainId).abi),
            functionName: "balanceOf",
            args: [address!],
          },
          {
            address: MOCK_ERC721_CONTRACT(chainId).address,
            abi: parseAbi(MOCK_ERC721_CONTRACT(chainId).abi),
            functionName: "balanceOf",
            args: [address!],
          },
        ],
      });
      setLog(`Multicall result: ${JSON.stringify(result, null, 2)}`, "info");
    } catch (error) {
      setLog(`Error multicalling: ${JSON.stringify(error, null, 2)}`, "error");
    }
  };

  const CONTRACT_FUNCTIONS: Record<string, () => Promise<void> | void> = {
    "Estimate Gas (transfer)": estimateGasForTransferTokenFn,
    "mint (ERC20)": mintMockTokenFn,
    "transfer (ERC20)": transferTokenFn,
    "balanceOf (ERC20)": balanceOfTokenFn,
    "mint (ERC721)": mintMockERC721Fn,
    "balanceOf (ERC721)": balanceOfERC721Fn,
    Multicall: multicallFn,
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <h2 className="text-2xl font-bold">Contract Functions</h2>
      <div className="grid grid-cols-2 gap-2">
        {Object.entries(CONTRACT_FUNCTIONS).map(([key, value]) => (
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
