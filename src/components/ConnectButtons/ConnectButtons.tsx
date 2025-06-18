import { useState } from "react";
import { cn } from "../../utils/cn";
import { CustomAuth } from "./CustomAuth";
import { DefaultLogin } from "./DefaultLogin";

type ConnectMethod = "default" | "custom";

export const ConnectButtons = () => {
  const [method, setMethod] = useState<ConnectMethod>("default");

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl overflow-hidden">
      <div className="flex w-full border-b border-gray-200">
        <button
          className={cn(
            "flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 transition-colors cursor-pointer",
            method === "default"
              ? "border-blue-500 text-blue-600 bg-blue-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"
          )}
          onClick={() => setMethod("default")}
        >
          Default Method
        </button>
        <button
          className={cn(
            "flex-1 py-3 px-4 text-sm font-medium text-center border-b-2 transition-colors cursor-pointer",
            method === "custom"
              ? "border-blue-500 text-blue-600 bg-blue-50"
              : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50"
          )}
          onClick={() => setMethod("custom")}
        >
          Custom Method
        </button>
      </div>

      <div className="bg-gray-50">
        {method === "default" && <DefaultLogin />}
        {method === "custom" && <CustomAuth />}
      </div>
    </div>
  );
};
