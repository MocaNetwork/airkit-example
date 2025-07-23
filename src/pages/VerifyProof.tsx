import { transformForOnchain, type Proof } from "@reclaimprotocol/js-sdk";
import { useMemo, useState } from "react";
import { useChainId, useConfig, useWriteContract } from "wagmi";
import { Button } from "../components/common/Button";
import { getReclaimContract } from "../utils/constants";

export default function VerifyProof({ proof }: { proof: Proof }) {
  const [verified, setVerified] = useState(false);
  const [loading, setLoading] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [verifyError, setVerifyError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract();
  const { chains } = useConfig();
  const chainId = useChainId();

  const newProof = useMemo(() => {
    return transformForOnchain(proof);
  }, [proof]);

  const contract = useMemo(() => getReclaimContract(chainId), [chainId]);
  const chainNotSupported = !contract.address;

  return (
    <div>
      <Button
        onClick={async () => {
          setLoading(true);
          setVerifyError(null);
          try {
            const hash = await writeContractAsync({
              abi: contract.abi,
              address: contract.address,
              functionName: "verifyProof",
              args: [newProof],
            });
            if (hash) {
              setVerified(true);
              setTxHash(hash as string);
            }
          } catch {
            setVerifyError("Fail to verify");
          } finally {
            setLoading(false);
          }
        }}
        disabled={verified || loading || chainNotSupported}
      >
        {chainNotSupported
          ? "Chain not supported"
          : loading
          ? "Verifying..."
          : verified
          ? "Verified"
          : "Verify Proof"}
      </Button>
      {chainNotSupported && (
        <div className="text-red-500 text-sm mt-2">
          Current chain is not supported.
        </div>
      )}
      {verifyError && (
        <div className="text-red-500 text-sm mt-2">{verifyError}</div>
      )}
      {verified &&
        txHash &&
        (() => {
          const chain = chains?.find((c) => c.id === chainId);
          const explorerUrl = chain?.blockExplorers?.default?.url;
          return explorerUrl ? (
            <a
              href={`${explorerUrl}/tx/${txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-2 inline-block"
            >
              <Button variant="outline">View Transaction</Button>
            </a>
          ) : null;
        })()}
    </div>
  );
}
