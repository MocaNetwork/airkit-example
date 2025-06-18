import type { AirEventData } from "@mocanetwork/airkit";
import { memo, useCallback, useEffect, useState } from "react";
import { useAirkit } from "../hooks/useAirkit";
import { CopyButton } from "./CopyButton";

export const EmbedState = memo(() => {
  const { airService } = useAirkit();
  const [embedState, setEmbedState] = useState<AirEventData | null>(null);

  const onEmbedEvent = useCallback((data: AirEventData) => {
    if (data.event === "initialized") {
      setEmbedState(data);
    } else if (data.event === "logged_in") {
      setEmbedState(data);
    } else if (data.event === "logged_out") {
      setEmbedState(data);
    } else if (data.event === "wallet_initialized") {
      setEmbedState(data);
    } else {
      console.log("unknown event:", data);
    }
  }, []);

  useEffect(() => {
    if (airService) {
      airService.on(onEmbedEvent);

      return () => {
        airService.off(onEmbedEvent);
      };
    }
  }, [airService, onEmbedEvent]);

  return (
    <div className="min-h-[300px] p-4 bg-gray-50 border-r border-gray-200 mt-2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">Embed State</h2>
        {embedState && (
          <CopyButton text={JSON.stringify(embedState, null, 2)} />
        )}
      </div>

      <div className="overflow-y-auto">
        {!embedState ? (
          <div className="text-center text-gray-500 mt-4">
            No embed state available
          </div>
        ) : (
          <div className="p-3 rounded-lg text-sm font-mono break-words bg-blue-50 text-blue-700">
            <div className="overflow-x-auto">
              <pre className="whitespace-pre">
                {JSON.stringify(embedState, null, 2)}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
});
