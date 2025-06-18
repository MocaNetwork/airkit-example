import type { AirConnector } from "@mocanetwork/airkit-connector";
import { useRef } from "react";
import { useConfig, useConnect, type Config } from "wagmi";
import type { ConnectVariables } from "wagmi/query";
import { useLogging } from "../../hooks/useLogging";
import { usePartner } from "../../hooks/usePartner";
import { generateAuthToken } from "../../utils";
import { Button } from "../common/Button";
import { Input } from "../common/Input";
import { TextArea } from "../common/Input/TextArea";

export const CustomAuth = () => {
  const { connect } = useConnect();
  const config = useConfig();
  const { setLog } = useLogging();
  const { partnerId } = usePartner();
  const privateKeyRef = useRef<HTMLTextAreaElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const partnerUserIdRef = useRef<HTMLInputElement>(null);

  const handleConnect = async () => {
    if (!privateKeyRef.current) {
      setLog("Please enter private key");
      return;
    }

    const airConnector = config.connectors.find(
      (connector) => connector?.isMocaNetwork
    );

    const authToken = await generateAuthToken({
      privateKey: privateKeyRef.current.value,
      email: emailRef.current?.value,
      partnerUserId: partnerUserIdRef.current?.value,
      partnerId,
    });

    connect({
      connector: airConnector!,
      authToken,
    } as unknown as ConnectVariables<Config, AirConnector>);
  };

  return (
    <div className="mx-auto p-6 bg-white">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">
        Custom Authentication
      </h2>
      <div className="max-w-lg mx-auto">
        <div className="space-y-4">
          <TextArea
            ref={privateKeyRef}
            label="Private Key"
            placeholder="Enter your private key"
          />
          <Input
            ref={emailRef}
            label="Email (optional)"
            type="email"
            placeholder="Enter your email"
            autoComplete="email"
          />
          <Input
            ref={partnerUserIdRef}
            label="Partner User ID (optional)"
            placeholder="Enter partner user ID"
          />
          <div className="pt-4">
            <Button
              onClick={handleConnect}
              className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition duration-200"
            >
              Connect Wallet
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
