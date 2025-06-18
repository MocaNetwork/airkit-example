import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useMemo, type FC, type ReactNode } from "react";
import { WagmiProvider } from "wagmi";
import { LogProvider } from "../contexts/LogProvider";
import { PartnerContext } from "../contexts/PartnerContext";
import { getConfig } from "../utils/wagmi";

const queryClient = new QueryClient();

export const Providers: FC<{
  children: ReactNode;
  partnerId: string;
}> = ({ children, partnerId }) => {
  const config = useMemo(() => {
    return getConfig(partnerId);
  }, [partnerId]);
  return (
    <PartnerContext.Provider value={{ partnerId }}>
      <LogProvider>
        <WagmiProvider config={config}>
          <QueryClientProvider client={queryClient}>
            {children}
          </QueryClientProvider>
        </WagmiProvider>
      </LogProvider>
    </PartnerContext.Provider>
  );
};
