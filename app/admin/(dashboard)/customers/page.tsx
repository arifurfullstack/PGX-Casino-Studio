import { Users, ShieldCheck, Clock, DollarSign } from "lucide-react";
import { getAdminCustomersList } from "@/services/adminCustomerService";
import CustomerManagementTable from "@/components/admin/CustomerManagementTable";

export const dynamic = "force-dynamic";

export default async function AdminCustomersPage() {
  const customers = await getAdminCustomersList();

  const totalCustomers = customers.length;
  const registeredCount = customers.filter((c) => c.isRegistered).length;
  const activeHoldsCount = customers.filter((c) => c.hasActiveHold).length;
  const totalPipelineValue = customers.reduce((sum, c) => sum + (c.totalPipelineValue || 0), 0);

  return (
    <div className="space-y-7">
      {/* Page Header */}
      <div className="pb-6 border-b border-purple-900/40">
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight flex items-center gap-2.5">
          <Users size={28} className="text-[#FFD700]" />
          <span>Customer &amp; Operator CRM</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mt-1.5">
          Unified client directory of registered B2B casino operators, prospective quote inquiries, and active 120-hour reservation holds.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-[#0b0114] border border-purple-900/40 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Total Client Leads</span>
            <Users size={20} className="text-purple-400" />
          </div>
          <div className="mt-3 text-3xl font-black text-white">{totalCustomers}</div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1.5">Unified operator profiles</p>
        </div>

        <div className="bg-[#0b0114] border border-purple-900/40 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Portal Accounts</span>
            <ShieldCheck size={20} className="text-green-400" />
          </div>
          <div className="mt-3 text-3xl font-black text-green-400">{registeredCount}</div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1.5">Authenticated B2B clients</p>
        </div>

        <div className="bg-[#0b0114] border border-purple-900/40 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Active 120h Holds</span>
            <Clock size={20} className="text-yellow-400" />
          </div>
          <div className="mt-3 text-3xl font-black text-yellow-400">{activeHoldsCount}</div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1.5">Locked 5% discount deposits</p>
        </div>

        <div className="bg-[#0b0114] border border-purple-900/40 rounded-2xl p-6 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-gray-300">Pipeline Valuation</span>
            <DollarSign size={20} className="text-[#FFD700]" />
          </div>
          <div className="mt-3 text-3xl font-black text-[#FFD700]">
            ${totalPipelineValue.toLocaleString()}
          </div>
          <p className="text-xs sm:text-sm text-gray-400 mt-1.5">Total software deal volume</p>
        </div>
      </div>

      {/* Main Table */}
      <CustomerManagementTable initialCustomers={customers} />
    </div>
  );
}
