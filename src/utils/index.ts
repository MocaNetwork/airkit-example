import { importPKCS8, SignJWT } from "jose";

export const isUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

const keyType = "ES256";

export const generateAuthToken = async ({
  privateKey,
  email,
  partnerUserId,
  partnerId,
}: {
  privateKey: string;
  email?: string;
  partnerUserId?: string;
  partnerId: string;
}) => {
  const payload = {
    email: email || undefined,
    partnerUserId: partnerUserId || undefined,
    partnerId,
  };

  if (!payload.email) delete payload.email;
  if (!payload.partnerUserId) delete payload.partnerUserId;

  const key = await importPKCS8(privateKey, keyType);
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: keyType })
    .setExpirationTime("1h")
    .setIssuedAt()
    .setIssuer(partnerId)
    .sign(key);
};
