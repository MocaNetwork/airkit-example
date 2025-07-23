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
const PROVIDER_ID = "b16c6781-4411-4bde-b1e6-c041df573f96"; // Example Provider Id

const ReclaimDemo = () => {
  const [ready, setReady] = useState(false);
  const [proof, setProof] = useState<Proof | null>(null);
  const [reclaimProofRequest, setReclaimProofRequest] =
    useState<ReclaimProofRequest | null>(null);
  const [requestUrl, setRequestUrl] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function initializeReclaim() {
      const proofRequest = await ReclaimProofRequest.init(
        APP_ID,
        APP_SECRET,
        PROVIDER_ID
      );

      setReclaimProofRequest(proofRequest);
    }
    initializeReclaim();
  }, []);

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
            {!requestUrl && (
              <Button
                className="mt-2 w-full max-w-xs"
                onClick={generateVerificationRequest}
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
