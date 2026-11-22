import { NextResponse } from "next/server";
import { checkAndExpireReservations } from "@/services/reservationService";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  try {
    const authHeader = request.headers.get("authorization");
    const cronSecret = process.env.CRON_SECRET || process.env.ADMIN_SESSION_SECRET;

    // Optional verification if CRON_SECRET is set
    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      // If a secret is provided in the query string instead (?secret=xyz)
      const url = new URL(request.url);
      const querySecret = url.searchParams.get("secret");
      if (querySecret !== cronSecret && process.env.NODE_ENV === "production") {
        return NextResponse.json({ error: "Unauthorized cron execution." }, { status: 401 });
      }
    }

    const result = await checkAndExpireReservations();
    return NextResponse.json({
      success: true,
      timestamp: new Date().toISOString(),
      ...result,
    });
  } catch (error) {
    console.error("Cron reservation check failed:", error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Internal cron error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  return GET(request);
}
