import { useState, useEffect } from "react";
import { Button } from "../components/common/Button";
import QRCode from "react-qr-code";
import {
  ClaimCreationType,
  ReclaimProofRequest,
  type Proof,
} from "@reclaimprotocol/js-sdk";
import { useNavigate } from "react-router";
import VerifyProof from "./VerifyProof";

const APP_ID = import.meta.env.VITE_RECLAIM_APP_ID;
const APP_SECRET = import.meta.env.VITE_RECLAIM_APP_SECRET;
const PROVIDERS = [
  {
    name: "GitHub UserName",
    providerId: "6d3f6753-7ee6-49ee-a545-62f1b1822ae5",
    logoUrl:
      "https://devtool-images.s3.ap-south-1.amazonaws.com/http-provider-brand-logos/github.com-82dc77d1-d420-4093-af25-a47c81531a8d.png",
  },
  {
    name: "Gmail Account",
    providerId: "f9f383fd-32d9-4c54-942f-5e9fda349762",
    logoUrl:
      "https://devtool-images.s3.ap-south-1.amazonaws.com/http-provider-brand-logos/google.com-4b9f85b5-17f3-44bc-bc19-254b4746ae1a.png",
  },
  {
    name: "LinkedIn - User Profile Details",
    providerId: "a9f1063c-06b7-476a-8410-9ff6e427e637",
    logoUrl:
      "https://devtool-images.s3.ap-south-1.amazonaws.com/http-provider-brand-logos/linkedin.com-d305300b-0b53-4b23-b0a3-f51171c11257.png",
  },
  {
    name: "Linkedin User Profile v2",
    providerId: "b16c6781-4411-4bde-b1e6-c041df573f96",
    logoUrl:
      "https://devtool-images.s3.ap-south-1.amazonaws.com/http-provider-brand-logos/linkedin.com-456d00ad-5eb8-4e4c-a6d2-9da22681d432.png",
  },
  {
    name: "Binance KYC Level",
    providerId: "2b22db5c-78d9-4d82-84f0-a9e0a4ed0470",
    logoUrl:
      "https://devtool-images.s3.ap-south-1.amazonaws.com/http-provider-brand-logos/binance.com-00a58378-085e-4a47-b651-1967548a06b3.png",
  },
  {
    name: "Twitter User Profile",
    providerId: "e6fe962d-8b4e-4ce5-abcc-3d21c88bd64a",
    logoUrl:
      "https://devtool-images.s3.ap-south-1.amazonaws.com/http-provider-brand-logos/x.com-106c6555-07ee-4337-9fbb-9c27c461af31.png",
  },
  {
    name: "Uber UID",
    providerId: "81dd6dc5-b50d-4276-b4cb-dc67bdcf919f",
    logoUrl:
      "https://devtool-images.s3.ap-south-1.amazonaws.com/http-provider-brand-logos/uber.com-581dfa43-409a-4651-89da-d0ed8514beba.png",
  },
];

const ReclaimDemo = () => {
  const [ready, setReady] = useState(false);
  const [proof, setProof] = useState<Proof | null>(null);
  const [reclaimProofRequest, setReclaimProofRequest] =
    useState<ReclaimProofRequest | null>(null);
  const [requestUrl, setRequestUrl] = useState("");
  const [selectedProvider, setSelectedProvider] = useState<
    (typeof PROVIDERS)[0] | null
  >(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!selectedProvider) return;
    async function initializeReclaim() {
      const proofRequest = await ReclaimProofRequest.init(
        APP_ID,
        APP_SECRET,
        selectedProvider ? selectedProvider.providerId : ""
      );

      setReclaimProofRequest(proofRequest);
    }
    initializeReclaim();
  }, [selectedProvider]);

  async function generateVerificationRequest() {
    if (!reclaimProofRequest) {
      console.error("Reclaim Proof Request not initialized");
      return;
    }
    reclaimProofRequest.addContext(
      `user's address`,
      "for acmecorp.com on 1st january"
    );
    reclaimProofRequest.setClaimCreationType(ClaimCreationType.ON_ME_CHAIN);
    const url = await reclaimProofRequest.getRequestUrl();
    setRequestUrl(url);
    await reclaimProofRequest.startSession({
      onSuccess: (proof) => {
        setReady(true);
        if (proof && typeof proof === "object" && !Array.isArray(proof)) {
          setProof(proof as Proof);
        } else {
          console.error("Invalid proof received");
        }
      },
      onError: (error) => {
        console.error("Verification failed", error);
      },
    });
  }

  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-4">
        <div className="col-span-1 lg:col-span-2 order-1 lg:order-0">
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="mb-4 w-full"
          >
            Back
          </Button>
          <div className="bg-white rounded-md shadow p-4 mt-4">
            <div className="text-lg font-semibold mb-2">Reclaim Demo</div>
            <div className="text-gray-500 text-sm">
              Generate a claim QR code and verify proof using Reclaim Protocol.
            </div>
          </div>
        </div>
        <div className="col-span-1 lg:col-span-4">
          <div className="bg-white rounded-md shadow p-6 flex flex-col items-center">
            {!selectedProvider && (
              <div className="w-full max-w-md">
                <div className="mb-4 text-center font-semibold">
                  Choose a Provider
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {PROVIDERS.map((provider) => (
                    <button
                      key={provider.providerId}
                      className="flex items-center border rounded p-1 hover:bg-gray-50 w-full text-xs"
                      style={{ minHeight: 32 }}
                      onClick={() => setSelectedProvider(provider)}
                    >
                      <img
                        src={provider.logoUrl}
                        alt={provider.name}
                        className="w-6 h-6 mr-1 rounded"
                      />
                      <span>{provider.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            {selectedProvider && !requestUrl && (
              <Button
                className="mt-2 w-full max-w-xs"
                onClick={generateVerificationRequest}
                disabled={!reclaimProofRequest}
              >
                Create Claim QR Code
              </Button>
            )}
            {requestUrl && (
              <div className="flex flex-col items-center mt-2">
                <QRCode value={requestUrl} size={180} />
                <div className="text-xs text-gray-400 mt-2 break-all text-center max-w-xs">
                  Scan this QR code with the Reclaim app
                </div>
              </div>
            )}
            {ready && (
              <>
                <div
                  className="mt-6 w-full overflow-x-auto bg-gray-100 p-4 rounded-md text-xs"
                  style={{
                    maxHeight: 300,
                    overflowX: "auto",
                    overflowY: "auto",
                  }}
                >
                  <div className="font-semibold mb-1 text-gray-700">Proof:</div>
                  <pre
                    className="whitespace-pre break-all"
                    style={{
                      maxHeight: 220,
                      overflowX: "auto",
                      overflowY: "auto",
                    }}
                  >
                    {JSON.stringify(proof, null, 2)}
                  </pre>
                </div>
                {proof && (
                  <div className="mt-4 w-full flex justify-center">
                    <div className="max-w-xs w-full flex justify-center">
                      <VerifyProof proof={proof} />
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReclaimDemo;
