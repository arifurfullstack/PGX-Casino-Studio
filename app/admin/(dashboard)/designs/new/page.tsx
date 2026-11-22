import DesignForm from "@/components/admin/designs/DesignForm";

export default function AdminNewDesignPage() {
  return (
    <div className="space-y-7">
      <div>
        <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-tight">
          Create New Casino Theme
        </h1>
        <p className="text-sm sm:text-base text-gray-400 mt-1.5">
          Add a new turnkey casino design to the catalog with interactive demo website pages.
        </p>
      </div>

      <DesignForm isNew={true} />
    </div>
  );
}
