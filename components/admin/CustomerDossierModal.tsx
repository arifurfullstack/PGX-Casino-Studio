"use client";

import { X, Building2, FileText, Clock } from "lucide-react";
import { AdminCustomerRecord } from "@/services/adminCustomerService";

interface CustomerDossierModalProps {
  customer: AdminCustomerRecord;
  onClose: () => void;
}

export default function CustomerDossierModal({ customer, onClose }: CustomerDossierModalProps) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0b0114] border border-purple-500/40 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto p-6 space-y-5 shadow-2xl relative">
        <button
          onClick={onClose}
          type="button"
          className="absolute top-4 right-4 text-gray-400 hover:text-white"
        >
          <X size={20} />
        </button>

        <div>
          <div className="flex items-center gap-2">
            <Building2 size={20} className="text-[#FFD700]" />
            <h3 className="text-lg font-black text-white uppercase tracking-wider">
              {customer.companyName}
            </h3>
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Representative: <span className="text-gray-200 font-semibold">{customer.fullName}</span> ({customer.email})
          </p>
        </div>

        {/* Quick Metrics */}
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-900/40">
            <p className="text-[10px] uppercase font-bold text-gray-400">Pipeline Value</p>
            <p className="text-base font-black text-[#FFD700]">${customer.totalPipelineValue.toLocaleString()}</p>
          </div>
          <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-900/40">
            <p className="text-[10px] uppercase font-bold text-gray-400">Total Quotes</p>
            <p className="text-base font-black text-white">{customer.inquiriesCount}</p>
          </div>
          <div className="p-3 rounded-lg bg-purple-950/40 border border-purple-900/40">
            <p className="text-[10px] uppercase font-bold text-gray-400">Active Holds</p>
            <p className="text-base font-black text-yellow-400">
              {customer.hasActiveHold ? "1 Active (120h)" : "None"}
            </p>
          </div>
        </div>

        {/* Inquiries / Quotes List */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2 flex items-center gap-1.5">
            <FileText size={13} />
            <span>Quotation Requests ({customer.inquiries.length})</span>
          </h4>
          {customer.inquiries.length === 0 ? (
            <p className="text-xs text-gray-500 italic">No quotes requested yet.</p>
          ) : (
            <div className="space-y-2">
              {customer.inquiries.map((inq) => (
                <div
                  key={inq.referenceNumber}
                  className="p-3 rounded-lg bg-white/5 border border-purple-900/30 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-mono text-[#FFD700] font-bold">{inq.referenceNumber}</span>
                    <p className="text-gray-300 font-medium">{inq.designName}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-white">${inq.totalPrice.toLocaleString()}</span>
                    <p className="text-[10px] text-gray-400 uppercase">{inq.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Reservations List */}
        <div>
          <h4 className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-2 flex items-center gap-1.5">
            <Clock size={13} />
            <span>Reservation Holds ({customer.reservations.length})</span>
          </h4>
          {customer.reservations.length === 0 ? (
            <p className="text-xs text-gray-500 italic">No reservations deposited yet.</p>
          ) : (
            <div className="space-y-2">
              {customer.reservations.map((res) => (
                <div
                  key={res.reservationId}
                  className="p-3 rounded-lg bg-white/5 border border-purple-900/30 flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-mono text-[#FFD700] font-bold">{res.reservationId}</span>
                    <p className="text-gray-300 font-medium">{res.designName}</p>
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-green-400">${res.discountedPrice.toLocaleString()} (Locked)</span>
                    <p className="text-[10px] text-gray-400 uppercase">{res.status}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="pt-2 flex justify-end">
          <button
            onClick={onClose}
            type="button"
            className="px-4 py-2 rounded-lg bg-purple-950 border border-purple-500/40 text-xs font-bold text-gray-200 hover:text-white"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
}
