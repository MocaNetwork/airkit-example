import { useState } from "react";
import { App } from "./App.tsx";
import { Layout } from "./components/layouts/Layout.tsx";
import { PartnerIDSelection } from "./components/PartnerIDSelection";
import "./index.css";
import { Providers } from "./providers";

export const Root = () => {
  const [partnerId, setPartnerId] = useState<string | null>(null);

  if (!partnerId) {
    return <PartnerIDSelection onSelect={setPartnerId} />;
  }

  return (
    <Providers partnerId={partnerId}>
      <Layout>
        <App />
      </Layout>
    </Providers>
  );
};
