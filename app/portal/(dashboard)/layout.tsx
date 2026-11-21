import { redirect } from "next/navigation";
import { getCustomerSession } from "@/lib/customerAuth";
import PortalSidebar from "@/components/portal/PortalSidebar";

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
    <div className="min-h-screen bg-[#04010a] text-white flex flex-col lg:flex-row">
      <PortalSidebar user={session} />
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 overflow-y-auto">
        <div className="max-w-6xl mx-auto space-y-6">
          {children}
        </div>
      </main>
    </div>
  );
}
