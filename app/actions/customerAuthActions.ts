"use server";

import { redirect } from "next/navigation";
import { connectToDatabase } from "@/lib/mongodb";
import { CustomerUserModel } from "@/models";
import { hashPassword, verifyPassword, setCustomerSession, clearCustomerSession } from "@/lib/customerAuth";

export async function registerCustomerAction(prevState: { error?: string } | null, formData: FormData) {
  const fullName = (formData.get("fullName") as string)?.trim();
  const companyName = (formData.get("companyName") as string)?.trim();
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const phoneNumber = (formData.get("phoneNumber") as string)?.trim();
  const whatsappNumber = (formData.get("whatsappNumber") as string)?.trim() || phoneNumber;
  const password = formData.get("password") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

  if (!fullName || !email || !phoneNumber || !password) {
    return { error: "Please complete all required fields." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  try {
    await connectToDatabase();
    const existing = await CustomerUserModel.findOne({ email });
    if (existing) {
      return { error: "An account with this email already exists. Please sign in instead." };
    }

    const { hash, salt } = hashPassword(password);
    const userDoc = await CustomerUserModel.create({
      email,
      fullName,
      companyName,
      phoneNumber,
      whatsappNumber,
      passwordHash: hash,
      salt,
      role: "client",
    });

    await setCustomerSession({
      userId: userDoc._id.toString(),
      email: userDoc.email,
      fullName: userDoc.fullName,
      companyName: userDoc.companyName,
    });
  } catch (error) {
    console.error("Customer registration error:", error);
    return { error: "Failed to create account. Please try again." };
  }

  redirect("/portal");
}

export async function loginCustomerAction(prevState: { error?: string } | null, formData: FormData) {
  const email = (formData.get("email") as string)?.trim().toLowerCase();
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { error: "Please enter your email and password." };
  }

  try {
    await connectToDatabase();
    const user = await CustomerUserModel.findOne({ email });
    if (!user) {
      return { error: "Invalid email or password. Please try again." };
    }

    const isValid = verifyPassword(password, user.passwordHash, user.salt);
    if (!isValid) {
      return { error: "Invalid email or password. Please try again." };
    }

    if (user.status === "suspended") {
      return { error: "Your account is currently suspended. Please contact your account manager." };
    }

    await setCustomerSession({
      userId: user._id.toString(),
      email: user.email,
      fullName: user.fullName,
      companyName: user.companyName,
    });
  } catch (error) {
    console.error("Customer login error:", error);
    return { error: "Failed to sign in. Please try again." };
  }

  redirect("/portal");
}

export async function logoutCustomerAction() {
  await clearCustomerSession();
  redirect("/portal/login");
}
