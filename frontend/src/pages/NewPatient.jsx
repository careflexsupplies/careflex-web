import { useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { ShieldCheck, CreditCard, CheckCircle2, ArrowLeft } from "lucide-react";
import Layout, { CallButton, TrustBadges } from "@/components/Layout";
import { usePageMeta } from "@/components/Shared";
import { submitForm, trackEvent } from "@/lib/api";
import { toast } from "sonner";

const categories = [
  { value: "cgm", label: "CGM / Glucose Monitors" },
  { value: "mobility", label: "Mobility Aids" },
  { value: "braces", label: "Braces" },
  { value: "surgical-dressings", label: "Surgical Dressings" },
];

export default function NewPatient() {
  usePageMeta("New Patient Form", "Start with CareFlex — Medicare and Commercial PPO patients welcome. Quick sign-up, we handle the paperwork.");
  const [params, setParams] = useSearchParams();
  const plan = params.get("plan");
  const [form, setForm] = useState({ name: "", phone: "", email: "", equipment_category: "cgm" });
  const [done, setDone] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await submitForm(`New patient (${plan === "medicare" ? "Medicare" : "Commercial PPO"})`, { ...form, plan_type: plan });
      trackEvent("form_submit", { form: "new_patient", plan });
      setDone(true);
    } catch {
      toast.error("Something went wrong. Please try again or call us.");
    }
  };

  const inputCls = "w-full px-4 py-3 min-h-[44px] rounded-md border border-slate-300 bg-white text-lg focus:border-primary";

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary tracking-tight mb-3 text-center" data-testid="new-patient-title">New Patient Form</h1>
        <p className="text-lg text-slate-600 mb-10 text-center">Tell us your coverage type and what you need — our team verifies your benefits and calls you back, usually the same day.</p>

        {done ? (
          <div className="bg-secondary rounded-2xl p-10 text-center" data-testid="new-patient-success">
            <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-4" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-bold text-primary mb-3">Welcome to CareFlex, {form.name.split(" ")[0]}!</h2>
            <p className="text-lg text-slate-600 mb-6">A benefits specialist will contact you within one business day. Need answers now?</p>
            <CallButton size="lg" />
          </div>
        ) : !plan ? (
          <div className="grid sm:grid-cols-2 gap-6" data-testid="plan-selection">
            <button onClick={() => setParams({ plan: "medicare" })} data-testid="plan-medicare-button"
              className="bg-white rounded-2xl border-2 border-slate-200 hover:border-primary p-10 text-center transition-colors shadow-sm">
              <ShieldCheck className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
              <h2 className="font-serif text-2xl font-bold text-primary mb-2">Medicare</h2>
              <p className="text-slate-600">Original Medicare, Part B, or Medicare Advantage</p>
            </button>
            <button onClick={() => setParams({ plan: "ppo" })} data-testid="plan-ppo-button"
              className="bg-white rounded-2xl border-2 border-slate-200 hover:border-primary p-10 text-center transition-colors shadow-sm">
              <CreditCard className="w-12 h-12 text-primary mx-auto mb-4" aria-hidden="true" />
              <h2 className="font-serif text-2xl font-bold text-primary mb-2">Commercial PPO</h2>
              <p className="text-slate-600">BCBS, UnitedHealthcare, Aetna, Cigna & most PPO plans</p>
            </button>
          </div>
        ) : (
          <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 lg:p-10 space-y-5" data-testid="new-patient-form">
            <button type="button" onClick={() => setParams({})} data-testid="change-plan-button" className="inline-flex items-center gap-2 text-primary font-semibold min-h-[44px]">
              <ArrowLeft className="w-4 h-4" aria-hidden="true" /> {plan === "medicare" ? "Medicare" : "Commercial PPO"} — change
            </button>
            <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="np-name">Full name *</label>
              <input id="np-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} data-testid="np-name-input" /></div>
            <div className="grid sm:grid-cols-2 gap-5">
              <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="np-phone">Phone *</label>
                <input id="np-phone" required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} data-testid="np-phone-input" /></div>
              <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="np-email">Email *</label>
                <input id="np-email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} data-testid="np-email-input" /></div>
            </div>
            <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="np-cat">What do you need? *</label>
              <select id="np-cat" value={form.equipment_category} onChange={(e) => setForm({ ...form, equipment_category: e.target.value })} className={inputCls} data-testid="np-category-select">
                {categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select></div>
            <button type="submit" data-testid="np-submit-button"
              className="w-full rounded-full bg-primary text-primary-foreground font-semibold px-8 py-4 text-lg min-h-[44px] hover:brightness-110 transition-[filter]">
              Submit — Check My Coverage
            </button>
            <p className="text-sm text-slate-500">No medical details needed here. Health information is collected later through our <Link to="/intake" className="underline text-primary">secure HIPAA intake</Link> or by phone.</p>
          </form>
        )}
        <div className="flex justify-center mt-10"><TrustBadges /></div>
      </div>
    </Layout>
  );
}
