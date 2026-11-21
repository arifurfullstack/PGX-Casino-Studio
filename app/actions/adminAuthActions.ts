"use server";

import { redirect } from "next/navigation";
import { setAdminSession, clearAdminSession, verifyAdminPassword } from "@/lib/adminAuth";

export async function loginAdminAction(prevState: { error?: string } | null, formData: FormData) {
  const password = formData.get("password") as string;

  if (!password || !verifyAdminPassword(password)) {
    return { error: "Invalid admin password. Please try again." };
  }

  await setAdminSession();
  redirect("/admin");
}

export async function logoutAdminAction() {
  await clearAdminSession();
  redirect("/admin/login");
}
