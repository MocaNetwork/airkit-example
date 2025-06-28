import { airConnector } from "@mocanetwork/airkit-connector";
import { createConfig, http } from "wagmi";
import { baseSepolia, soneiumMinato } from "wagmi/chains";
import { BUILD_ENV, mocaTestnet } from "./constants";

export const getConfig = (partnerId: string) => {
  const connectors = [
    airConnector({
      buildEnv: BUILD_ENV,
      enableLogging: true,
      partnerId,
    }),
  ];

  return createConfig({
    chains: [mocaTestnet, baseSepolia, soneiumMinato],
    transports: {
      [mocaTestnet.id]: http(),
      [baseSepolia.id]: http(),
      [soneiumMinato.id]: http(),
    },
    connectors,
  });
};
