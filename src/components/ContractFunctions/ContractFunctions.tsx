import { multicall } from "@wagmi/core";
import { encodeFunctionData, formatEther, parseAbi } from "viem";
import {
  useAccount,
  useConfig,
  useEstimateGas,
  useReadContract,
  useWriteContract,
} from "wagmi";
import { useLogging } from "../../hooks/useLogging";
import {
  DEFAULT_CHAIN,
  MOCK_ERC20_CONTRACT,
  MOCK_ERC721_CONTRACT,
} from "../../utils/constants";
import { Button } from "../common/Button";
import { useMemo } from "react";

export const ContractFunctions = () => {
  const { setLog } = useLogging();
  const { address } = useAccount();
  const config = useConfig();

  const data = useMemo(
    () =>
      encodeFunctionData({
        abi: parseAbi(MOCK_ERC20_CONTRACT(DEFAULT_CHAIN.id).abi),
        functionName: "transfer",
        args: [address, "10"],
      }),
    [address]
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
    address: MOCK_ERC20_CONTRACT(DEFAULT_CHAIN.id).address,
    abi: parseAbi(MOCK_ERC20_CONTRACT(DEFAULT_CHAIN.id).abi),
    functionName: "balanceOf",
    args: [address],
  });
  const { refetch: refetchErc721Balance } = useReadContract({
    address: MOCK_ERC721_CONTRACT(DEFAULT_CHAIN.id).address,
    abi: parseAbi(MOCK_ERC721_CONTRACT(DEFAULT_CHAIN.id).abi),
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
        address: MOCK_ERC20_CONTRACT(DEFAULT_CHAIN.id).address,
        abi: parseAbi(MOCK_ERC20_CONTRACT(DEFAULT_CHAIN.id).abi),
        functionName: "mint",
        args: [address, "10"],
      });
      setLog(`Minted token: ${result}`, "info");
    } catch (error) {
      setLog(`Error minting token: ${error}`, "error");
    }
  };

  const transferTokenFn = async () => {
    try {
      const result = await writeContractAsync({
        address: MOCK_ERC20_CONTRACT(DEFAULT_CHAIN.id).address,
        abi: parseAbi(MOCK_ERC20_CONTRACT(DEFAULT_CHAIN.id).abi),
        functionName: "transfer",
        args: [address, "10"],
      });
      setLog(`Transferred token: ${result}`, "info");
    } catch (error) {
      setLog(`Error transferring token: ${error}`, "error");
    }
  };

  const balanceOfTokenFn = async () => {
    const { data: result } = await refetchErc20Balance();
    if (typeof result !== "bigint") {
      setLog("No balance of token", "info");
      return;
    }
    setLog(`Balance of token: ${formatEther(result)}`, "info");
  };

  const mintMockERC721Fn = async () => {
    try {
      const result = await writeContractAsync({
        address: MOCK_ERC721_CONTRACT(DEFAULT_CHAIN.id).address,
        abi: parseAbi(MOCK_ERC721_CONTRACT(DEFAULT_CHAIN.id).abi),
        functionName: "safeMint",
        args: [address],
      });
      setLog(`Minted token: ${result}`, "info");
    } catch (error) {
      setLog(`Error minting token: ${error}`, "error");
    }
  };

  const balanceOfERC721Fn = async () => {
    const { data: result } = await refetchErc721Balance();
    if (typeof result !== "bigint") {
      setLog("No balance of token", "info");
      return;
    }
    setLog(`Balance of token: ${result}`, "info");
  };

  const multicallFn = async () => {
    try {
      const result = await multicall(config, {
        contracts: [
          {
            address: MOCK_ERC20_CONTRACT(DEFAULT_CHAIN.id).address,
            abi: parseAbi(MOCK_ERC20_CONTRACT(DEFAULT_CHAIN.id).abi),
            functionName: "balanceOf",
            args: [address!],
          },
          {
            address: MOCK_ERC721_CONTRACT(DEFAULT_CHAIN.id).address,
            abi: parseAbi(MOCK_ERC721_CONTRACT(DEFAULT_CHAIN.id).abi),
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

  const CONTRACT_FUNCTIONS: Record<string, () => void> = {
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
          <Button key={key} onClick={value} variant="outline">
            {key}
          </Button>
        ))}
      </div>
    </div>
  );
};
