import { useState } from "react";
import { Printer, Clock, CheckCircle2 } from "lucide-react";
import Layout, { CallButton } from "@/components/Layout";
import { usePageMeta } from "@/components/Shared";
import { api, FAX, trackEvent } from "@/lib/api";
import { toast } from "sonner";

export default function Providers() {
  usePageMeta("For Providers & Referrals", "Refer patients to CareFlex — same-day referral confirmation for discharge planners, case managers, and physicians.");
  const [form, setForm] = useState({ name: "", organization: "", role: "", email: "", phone: "", equipment_category: "mobility-aids", message: "" });
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    await api.post("/leads", { type: "referral", ...form });
    trackEvent("form_submit", { form: "provider_referral" });
    setSent(true);
    toast.success("Referral received — we'll confirm within one business day.");
  };

  const inputCls = "w-full px-4 py-3 min-h-[44px] rounded-md border border-slate-300 bg-white focus:border-primary";

  return (
    <Layout>
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary tracking-tight mb-6" data-testid="providers-title">Referrals confirmed same day.</h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Discharge planners, case managers, and physicians: CareFlex verifies benefits, collects documentation, and delivers before your patient falls into the gap.
            </p>
            <ul className="space-y-3 mb-8">
              {["Same-day referral confirmation", "Insurance verification handled by our team", "Delivery in 2–5 business days, urgent discharge prioritized", "Dedicated provider line and e-fax"].map((x) => (
                <li key={x} className="flex items-start gap-3 text-lg text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))] mt-1 shrink-0" aria-hidden="true" />{x}
                </li>
              ))}
            </ul>
            <div className="bg-secondary rounded-xl p-6 space-y-3">
              <p className="flex items-center gap-3 text-lg font-semibold text-primary"><Printer className="w-5 h-5" aria-hidden="true" /> E-fax referrals: {FAX}</p>
              <p className="flex items-center gap-3 text-slate-600"><Clock className="w-5 h-5" aria-hidden="true" /> Fax orders processed Mon–Fri, 8 AM – 6 PM</p>
              <CallButton />
            </div>
          </div>
          <img src="https://images.pexels.com/photos/7578810/pexels-photo-7578810.jpeg?auto=compress&w=900" alt="Physician reviewing patient referral" className="rounded-2xl shadow-lg w-full object-cover aspect-[5/4]" />
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-serif text-3xl font-bold text-primary mb-3">Submit a referral</h2>
        <p className="text-slate-600 mb-8">Non-PHI referral request — do not include patient identifiers. Our team will contact you securely to collect patient details.</p>
        {sent ? (
          <div className="bg-[hsl(123,46%,94%)] rounded-xl p-10 text-center" data-testid="referral-success">
            <CheckCircle2 className="w-12 h-12 text-[hsl(var(--success))] mx-auto mb-4" aria-hidden="true" />
            <p className="text-xl font-semibold text-primary">Referral received. We'll confirm within one business day.</p>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 grid sm:grid-cols-2 gap-5" data-testid="referral-form">
            <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="ref-name">Your name *</label>
              <input id="ref-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} data-testid="referral-name-input" /></div>
            <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="ref-org">Organization *</label>
              <input id="ref-org" required value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} className={inputCls} data-testid="referral-org-input" /></div>
            <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="ref-role">Your role</label>
              <input id="ref-role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })} placeholder="Case manager, discharge planner…" className={inputCls} data-testid="referral-role-input" /></div>
            <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="ref-cat">Equipment needed</label>
              <select id="ref-cat" value={form.equipment_category} onChange={(e) => setForm({ ...form, equipment_category: e.target.value })} className={inputCls} data-testid="referral-category-select">
                <option value="mobility-aids">Mobility Aids</option><option value="orthotics">Orthotics</option>
                <option value="diabetes-care">Diabetes Care</option><option value="wound-care">Wound Care</option><option value="other">Other / Multiple</option>
              </select></div>
            <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="ref-email">Work email *</label>
              <input id="ref-email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} data-testid="referral-email-input" /></div>
            <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="ref-phone">Phone *</label>
              <input id="ref-phone" required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} data-testid="referral-phone-input" /></div>
            <div className="sm:col-span-2"><label className="block font-semibold text-slate-700 mb-2" htmlFor="ref-msg">Notes (no patient identifiers)</label>
              <textarea id="ref-msg" rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputCls} data-testid="referral-message-input" /></div>
            <button type="submit" data-testid="referral-submit-button"
              className="sm:col-span-2 rounded-full bg-primary text-primary-foreground font-semibold px-8 py-4 text-lg min-h-[44px] hover:brightness-110 transition-[filter]">
              Submit Referral
            </button>
          </form>
        )}
      </section>
    </Layout>
  );
}
