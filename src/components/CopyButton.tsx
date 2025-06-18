import { useState } from "react";
import { cn } from "../utils/cn";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export const CopyButton = ({ text, className = "" }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      className={cn(
        "px-2 py-1 text-xs font-medium rounded hover:bg-opacity-80 transition-all",
        copied
          ? "bg-green-100 text-green-700"
          : "bg-gray-100 text-gray-700 hover:bg-gray-200",
        className
      )}
    >
      {copied ? "Copied!" : "Copy"}
    </button>
  );
};
