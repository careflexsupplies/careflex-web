import { useState } from "react";
import { Link } from "react-router-dom";
import { HeartPulse, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import { CallButton, TrustBadges } from "@/components/Layout";
import { usePageMeta } from "@/components/Shared";
import { api, trackEvent } from "@/lib/api";
import { toast } from "sonner";

const needs = [
  { value: "mobility-aids", label: "Wheelchair / Walker / Mobility" },
  { value: "orthotics", label: "Brace or Support (Knee, Back...)" },
  { value: "diabetes-care", label: "Diabetes Supplies" },
  { value: "wound-care", label: "Wound Care Supplies" },
  { value: "other", label: "Something else" },
];
const insurances = ["Medicare", "Medicare Advantage", "Medicaid", "Private insurance", "No insurance / cash-pay"];

export default function Landing() {
  usePageMeta("Get Covered Equipment", "Check if your medical equipment is covered by Medicare or insurance in under 2 minutes.");
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({ equipment_category: "", insurance: "", name: "", phone: "", email: "" });
  const [done, setDone] = useState(false);

  const submit = async () => {
    try {
      await api.post("/leads", { type: "campaign", source: "landing_page", variant: "A", ...form, message: `Needs: ${form.equipment_category}; Insurance: ${form.insurance}` });
      trackEvent("form_submit", { form: "campaign_landing" });
      setDone(true);
    } catch {
      toast.error("Something went wrong. Please try again or call us.");
    }
  };

  const inputCls = "w-full px-4 py-3.5 min-h-[44px] rounded-md border border-slate-300 bg-white text-lg focus:border-primary";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Minimal nav */}
      <header className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2" data-testid="landing-logo">
            <HeartPulse className="w-7 h-7 text-accent" aria-hidden="true" />
            <span className="font-serif text-xl font-bold text-primary">CareFlex</span>
          </Link>
          <CallButton className="!px-4 !py-2 !text-sm sm:!text-base" />
        </div>
      </header>

      <main className="flex-1 max-w-3xl mx-auto px-4 sm:px-6 py-12 lg:py-16 w-full">
        {done ? (
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 lg:p-14 text-center" data-testid="landing-thank-you">
            <CheckCircle2 className="w-16 h-16 text-[hsl(var(--success))] mx-auto mb-6" aria-hidden="true" />
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-primary mb-4">You're all set, {form.name.split(" ")[0]}!</h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">A CareFlex benefits specialist will call you within one business day to verify your coverage. Want answers right now?</p>
            <CallButton size="lg" />
          </div>
        ) : (
          <>
            <div className="text-center mb-10">
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-primary tracking-tight mb-4" data-testid="landing-title">
                Is your medical equipment covered? Find out in 2 minutes.
              </h1>
              <p className="text-lg text-slate-600">Free benefit check. No obligation. Medicare, Medicaid, and most plans accepted.</p>
            </div>

            {/* Progress */}
            <div className="flex items-center gap-2 mb-8" aria-label={`Step ${step + 1} of 3`} data-testid="landing-progress">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`h-2 flex-1 rounded-full transition-colors ${i <= step ? "bg-accent" : "bg-slate-200"}`} />
              ))}
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 lg:p-10">
              {step === 0 && (
                <fieldset>
                  <legend className="font-serif text-2xl font-bold text-primary mb-6">What do you need?</legend>
                  <div className="space-y-3">
                    {needs.map((n) => (
                      <button key={n.value} data-testid={`landing-need-${n.value}`}
                        onClick={() => { setForm({ ...form, equipment_category: n.value }); setStep(1); }}
                        className={`w-full text-left px-5 py-4 min-h-[44px] rounded-xl border-2 text-lg font-medium transition-colors ${form.equipment_category === n.value ? "border-accent bg-accent/5" : "border-slate-200 hover:border-accent"}`}>
                        {n.label}
                      </button>
                    ))}
                  </div>
                </fieldset>
              )}
              {step === 1 && (
                <fieldset>
                  <legend className="font-serif text-2xl font-bold text-primary mb-6">What insurance do you have?</legend>
                  <div className="space-y-3 mb-6">
                    {insurances.map((ins) => (
                      <button key={ins} data-testid={`landing-insurance-${ins.toLowerCase().replace(/[^a-z]+/g, "-")}`}
                        onClick={() => { setForm({ ...form, insurance: ins }); setStep(2); }}
                        className={`w-full text-left px-5 py-4 min-h-[44px] rounded-xl border-2 text-lg font-medium transition-colors ${form.insurance === ins ? "border-accent bg-accent/5" : "border-slate-200 hover:border-accent"}`}>
                        {ins}
                      </button>
                    ))}
                  </div>
                  <button onClick={() => setStep(0)} data-testid="landing-back-1" className="inline-flex items-center gap-2 text-primary font-semibold min-h-[44px]">
                    <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back
                  </button>
                </fieldset>
              )}
              {step === 2 && (
                <form onSubmit={(e) => { e.preventDefault(); submit(); }}>
                  <h2 className="font-serif text-2xl font-bold text-primary mb-6">Where should we send your results?</h2>
                  <div className="space-y-5 mb-6">
                    <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="l-name">Full name *</label>
                      <input id="l-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} data-testid="landing-name-input" /></div>
                    <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="l-phone">Phone *</label>
                      <input id="l-phone" required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} data-testid="landing-phone-input" /></div>
                    <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="l-email">Email</label>
                      <input id="l-email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} data-testid="landing-email-input" /></div>
                  </div>
                  <div className="flex items-center justify-between gap-4">
                    <button type="button" onClick={() => setStep(1)} data-testid="landing-back-2" className="inline-flex items-center gap-2 text-primary font-semibold min-h-[44px]">
                      <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back
                    </button>
                    <button type="submit" data-testid="landing-submit-button"
                      className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground font-semibold px-8 py-4 text-lg min-h-[44px] hover:brightness-95 transition-[filter]">
                      Check My Coverage <ArrowRight className="w-5 h-5" aria-hidden="true" />
                    </button>
                  </div>
                  <p className="text-sm text-slate-500 mt-5">No medical details needed here. By submitting you agree to be contacted by CareFlex about your equipment request.</p>
                </form>
              )}
            </div>
            <div className="flex justify-center mt-10"><TrustBadges /></div>
          </>
        )}
      </main>
    </div>
  );
}
