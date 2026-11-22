import { redirect } from "next/navigation";
import { isAdminAuthenticated } from "@/lib/adminAuth";
import AdminSidebar from "@/components/admin/AdminSidebar";

export const dynamic = "force-dynamic";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const isAuth = await isAdminAuthenticated();
  if (!isAuth) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#04010a] text-white flex flex-col lg:flex-row">
      <AdminSidebar />
      <main className="flex-1 min-w-0 p-5 sm:p-8 lg:p-10 xl:p-12 overflow-y-auto">
        <div className="max-w-[1680px] mx-auto w-full space-y-8">
          {children}
        </div>
      </main>
    </div>
  );
}
