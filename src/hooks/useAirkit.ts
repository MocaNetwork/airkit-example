import type { AirService } from "@mocanetwork/airkit";
import type { AirConnector } from "@mocanetwork/airkit-connector";
import { useMemo } from "react";
import { useConfig } from "wagmi";

type AirkitHook =
  | {
      isMocaNetwork: true;
      connector: AirConnector;
      airService: AirService;
    }
  | {
      isMocaNetwork: false;
      connector: null;
      airService: null;
    };

export const useAirkit = (): AirkitHook => {
  const config = useConfig();
  const airConnector = useMemo(
    () => config.connectors.find((connector): connector is AirConnector => !!connector.isMocaNetwork),
    [config.connectors]
  );

  if (airConnector) {
    return {
      connector: airConnector,
      airService: airConnector.airService,
      isMocaNetwork: true,
    };
  }
  return {
    connector: null,
    airService: null,
    isMocaNetwork: false,
  };
};
