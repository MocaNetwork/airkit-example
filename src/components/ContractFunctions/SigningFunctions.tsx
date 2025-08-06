import { useSignMessage } from "wagmi";
import { Button } from "../common/Button";
import { useLogging } from "../../hooks/useLogging";
import { useState } from "react";

export const SigningFunctions = () => {
  const { signMessageAsync } = useSignMessage();
  const { setLog } = useLogging();
  const [loading, setLoading] = useState(false);

  const signMessageFn = async () => {
    setLoading(true);
    try {
      const message = "Hello, World!";
      const signature = await signMessageAsync({ message });
      setLog(`Signature: ${signature}`, "success");
    } catch (error) {
      setLog(`Error: ${error}`, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-2 mt-4">
      <h2 className="text-2xl font-bold">Signing Functions</h2>
      <div className="grid grid-cols-2 gap-2">
        <Button onClick={signMessageFn} variant="outline" disabled={loading}>
          {loading ? "Loading..." : "Sign Message"}
        </Button>
      </div>
    </div>
  );
};
