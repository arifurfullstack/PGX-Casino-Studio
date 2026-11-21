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
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-wider flex items-center gap-2">
          <Users size={24} className="text-[#FFD700]" />
          <span>Customer & Operator CRM</span>
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">
          Unified client directory of registered B2B casino operators, prospective quote inquiries, and active 120-hour reservation holds.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-[#0b0114] border border-purple-900/40 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Total Client Leads</span>
            <Users size={16} className="text-purple-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-white">{totalCustomers}</div>
          <p className="text-[10px] text-gray-500 mt-0.5">Unified operator profiles</p>
        </div>

        <div className="bg-[#0b0114] border border-purple-900/40 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Portal Accounts</span>
            <ShieldCheck size={16} className="text-green-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-green-400">{registeredCount}</div>
          <p className="text-[10px] text-gray-500 mt-0.5">Authenticated B2B clients</p>
        </div>

        <div className="bg-[#0b0114] border border-purple-900/40 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Active 120h Holds</span>
            <Clock size={16} className="text-yellow-400" />
          </div>
          <div className="mt-2 text-2xl font-black text-yellow-400">{activeHoldsCount}</div>
          <p className="text-[10px] text-gray-500 mt-0.5">Locked 5% discount deposits</p>
        </div>

        <div className="bg-[#0b0114] border border-purple-900/40 rounded-xl p-4 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Pipeline Valuation</span>
            <DollarSign size={16} className="text-[#FFD700]" />
          </div>
          <div className="mt-2 text-2xl font-black text-[#FFD700]">
            ${totalPipelineValue.toLocaleString()}
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">Total software deal volume</p>
        </div>
      </div>

      {/* Main Table */}
      <CustomerManagementTable initialCustomers={customers} />
    </div>
  );
}
