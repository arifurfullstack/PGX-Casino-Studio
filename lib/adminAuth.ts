import { cookies } from "next/headers";

const ADMIN_COOKIE_NAME = "aig_admin_session";
const EXPECTED_SECRET =
  process.env.ADMIN_SESSION_SECRET ||
  process.env.JWT_SECRET ||
  "aig_sec_2026_super_secret_token";
const EXPECTED_PASSWORD = process.env.ADMIN_PASSWORD || "alligaming2026!";

export async function isAdminAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get(ADMIN_COOKIE_NAME);
  return session?.value === EXPECTED_SECRET;
}

export async function setAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_COOKIE_NAME, EXPECTED_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7, // 7 days
  });
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_COOKIE_NAME);
}

export function verifyAdminPassword(password: string): boolean {
  return password === EXPECTED_PASSWORD;
}
