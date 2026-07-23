import { useState, useEffect } from "react";
import { api } from "@/lib/api";
import { toast } from "sonner";

const statusColors = {
  new: "bg-amber-100 text-amber-800",
  contacted: "bg-blue-100 text-blue-800",
  closed: "bg-slate-100 text-slate-600",
};

export default function LeadsInbox() {
  const [leads, setLeads] = useState([]);
  const [filter, setFilter] = useState("");

  const load = () => api.get("/admin/leads").then((r) => setLeads(r.data));
  useEffect(() => { load(); }, []);

  const updateStatus = async (lead, status) => {
    await api.put(`/admin/leads/${lead.id}`, { status });
    toast.success(`Marked as ${status}`);
    load();
  };

  const filtered = filter ? leads.filter((l) => l.type === filter) : leads;

  return (
    <div>
      <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
        <h2 className="font-serif text-2xl font-bold text-primary">Lead Inbox</h2>
        <div className="flex gap-2">
          {[["", "All"], ["contact", "Contact"], ["referral", "Referrals"], ["campaign", "Campaign"]].map(([val, label]) => (
            <button key={val} onClick={() => setFilter(val)} data-testid={`leads-filter-${val || "all"}`}
              className={`px-4 py-2 min-h-[44px] rounded-full border font-semibold text-sm transition-colors ${filter === val ? "bg-primary text-white border-primary" : "bg-white text-slate-700 border-slate-300"}`}>
              {label}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-4" data-testid="leads-list">
        {filtered.length === 0 && <p className="text-slate-500 py-8 text-center bg-white rounded-xl border border-slate-200">No leads yet.</p>}
        {filtered.map((l) => (
          <div key={l.id} className="bg-white rounded-xl border border-slate-200 p-6" data-testid={`lead-item-${l.id}`}>
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <span className="font-semibold text-lg text-slate-900">{l.name}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-secondary text-primary text-xs font-bold uppercase">{l.type}</span>
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold uppercase ${statusColors[l.status] || statusColors.new}`}>{l.status}</span>
                </div>
                <p className="text-slate-600 text-sm">
                  {l.email && <span className="mr-4">{l.email}</span>}
                  {l.phone && <span className="mr-4">{l.phone}</span>}
                  {l.organization && <span className="mr-4">Org: {l.organization}</span>}
                  {l.insurance && <span className="mr-4">Insurance: {l.insurance}</span>}
                  {l.equipment_category && <span>Needs: {l.equipment_category}</span>}
                </p>
                {l.message && <p className="text-slate-700 mt-2 leading-relaxed">{l.message}</p>}
                <p className="text-xs text-slate-400 mt-2">{new Date(l.created_at).toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                {l.status !== "contacted" && (
                  <button onClick={() => updateStatus(l, "contacted")} data-testid={`lead-contacted-${l.id}`}
                    className="px-4 py-2 min-h-[44px] rounded-full bg-primary text-white text-sm font-semibold hover:brightness-110 transition-[filter]">Mark Contacted</button>
                )}
                {l.status !== "closed" && (
                  <button onClick={() => updateStatus(l, "closed")} data-testid={`lead-closed-${l.id}`}
                    className="px-4 py-2 min-h-[44px] rounded-full border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-secondary transition-colors">Close</button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
