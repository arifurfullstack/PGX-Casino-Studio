import DesignForm from "@/components/admin/designs/DesignForm";

export default function AdminNewDesignPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-white uppercase tracking-tight">
          Create New Casino Theme
        </h1>
        <p className="text-xs text-gray-400 mt-1">
          Add a new turnkey casino design to the B2B catalog with full multi-PNG preview suite.
        </p>
      </div>

      <DesignForm isNew={true} />
    </div>
  );
}
