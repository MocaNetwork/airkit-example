import { createRoot } from "react-dom/client";
import "./index.css";
import { Root } from "./Root.tsx";

createRoot(document.getElementById("root")!).render(<Root />);

// @ts-expect-error This is a workaround to fix the issue with BigInt values not being serialized correctly
BigInt.prototype.toJSON = function () {
  return this.toString();
};
