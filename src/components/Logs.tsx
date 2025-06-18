import { useLogging } from "../hooks/useLogging";
import { cn } from "../utils/cn";
import { CopyButton } from "./CopyButton";

export const Logs = () => {
  const { log } = useLogging();

  return (
    <div className="min-h-[300px] p-4 bg-gray-50 border-r border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-700">
          Current Activity
        </h2>
        {log && (
          <CopyButton
            text={`${log.message}\n${log.timestamp.toLocaleTimeString()}`}
          />
        )}
      </div>

      <div className="overflow-y-auto">
        {!log ? (
          <div className="text-center text-gray-500 mt-4">
            No current activity
          </div>
        ) : (
          <div
            className={cn("p-3 rounded-lg text-sm font-mono break-words", {
              "bg-red-50 text-red-700": log.type === "error",
              "bg-green-50 text-green-700": log.type === "success",
              "bg-blue-50 text-blue-700":
                log.type !== "error" && log.type !== "success",
            })}
          >
            <div className="font-medium">{log.message}</div>
            <div className="text-xs opacity-75 mt-1">
              {log.timestamp.toLocaleTimeString()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
