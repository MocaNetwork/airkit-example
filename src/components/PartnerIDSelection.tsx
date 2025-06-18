import { useState } from "react";
import { Button } from "./common/Button";
import { Input } from "./common/Input";

export const PartnerIDSelection = ({
  onSelect,
}: {
  onSelect: (partnerId: string) => void;
}) => {
  const [partnerId, setPartnerId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (partnerId.trim()) {
      onSelect(partnerId);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-50/40">
      <div className="w-full max-w-sm space-y-6 p-6 border border-zinc-200 rounded-lg bg-white">
        <div className="space-y-2">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Enter Partner ID
          </h2>
          <p className="text-sm text-zinc-500">
            Please provide your partner ID to continue
          </p>
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            id="partnerId"
            name="partnerId"
            label="Partner ID"
            type="text"
            required
            placeholder="Enter your partner ID"
            value={partnerId}
            onChange={(e) => setPartnerId(e.target.value)}
          />
          <Button type="submit" variant="primary" className="w-full">
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
};
