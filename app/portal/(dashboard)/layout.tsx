import { redirect } from "next/navigation";
import { getCustomerSession } from "@/lib/customerAuth";
import PortalSidebar from "@/components/portal/PortalSidebar";
import PortalBackground from "@/components/portal/PortalBackground";
import PortalMotionShell from "@/components/portal/PortalMotionShell";

export const dynamic = "force-dynamic";

export default async function CustomerPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCustomerSession();
  if (!session) {
    redirect("/portal/login");
  }

  return (
    <div className="relative min-h-screen bg-[#07020d] text-white flex flex-col lg:flex-row overflow-x-clip">
      <PortalBackground />
      <PortalSidebar user={session} />
      <main className="relative z-10 flex-1 min-w-0 px-4 py-4 sm:px-6 sm:py-5 lg:px-7 lg:py-6 overflow-y-auto">
        <div className="max-w-[1200px] w-full mx-auto">
          <PortalMotionShell>{children}</PortalMotionShell>
        </div>
      </main>
    </div>
  );
}
