import { airConnector } from "@mocanetwork/airkit-connector";
import { createConfig, http } from "wagmi";
import { baseSepolia, soneiumMinato } from "wagmi/chains";
import { BUILD_ENV } from "./constants";

export const getConfig = (partnerId: string) => {
  const connectors = [
    airConnector({
      buildEnv: BUILD_ENV,
      enableLogging: true,
      partnerId,
    }),
  ];

  return createConfig({
    chains: [baseSepolia, soneiumMinato],
    transports: {
      [baseSepolia.id]: http(),
      [soneiumMinato.id]: http(),
    },
    connectors,
  });
};
