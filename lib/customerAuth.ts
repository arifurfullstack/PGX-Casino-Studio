import { cookies } from "next/headers";
import crypto from "crypto";

export interface CustomerSessionPayload {
  userId: string;
  email: string;
  fullName: string;
  companyName?: string;
}

const CUSTOMER_COOKIE_NAME = "aig_customer_session";
const SECRET = process.env.JWT_SECRET || process.env.ADMIN_SESSION_SECRET || "aig_customer_session_fallback_secret_2026";

export function hashPassword(password: string): { hash: string; salt: string } {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 64).toString("hex");
  return { hash, salt };
}

export function verifyPassword(password: string, hash: string, salt: string): boolean {
  const verifyHash = crypto.scryptSync(password, salt, 64).toString("hex");
  return crypto.timingSafeEqual(Buffer.from(hash, "hex"), Buffer.from(verifyHash, "hex"));
}

export function signCustomerSession(payload: CustomerSessionPayload): string {
  const data = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const signature = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
  return `${data}.${signature}`;
}

export function verifyCustomerSession(token: string): CustomerSessionPayload | null {
  try {
    const [data, signature] = token.split(".");
    if (!data || !signature) return null;

    const expectedSig = crypto.createHmac("sha256", SECRET).update(data).digest("base64url");
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return null;
    }

    const payload = JSON.parse(Buffer.from(data, "base64url").toString("utf-8"));
    return payload as CustomerSessionPayload;
  } catch {
    return null;
  }
}

export async function getCustomerSession(): Promise<CustomerSessionPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get(CUSTOMER_COOKIE_NAME);
  if (!sessionCookie?.value) return null;
  return verifyCustomerSession(sessionCookie.value);
}

export async function setCustomerSession(payload: CustomerSessionPayload): Promise<void> {
  const cookieStore = await cookies();
  const token = signCustomerSession(payload);
  cookieStore.set(CUSTOMER_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 14, // 14 days
  });
}

export async function clearCustomerSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(CUSTOMER_COOKIE_NAME);
}
