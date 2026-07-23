import { ShieldCheck, Lock } from "lucide-react";
import Layout, { CallButton, TrustBadges } from "@/components/Layout";
import { usePageMeta } from "@/components/Shared";

// Replace with your real Jotform HIPAA form URL once the BAA is signed.
const JOTFORM_URL = "";

export default function Intake() {
  usePageMeta("Patient Intake", "Start your CareFlex order with our secure, HIPAA-compliant intake form.");
  return (
    <Layout>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <div className="text-center mb-10">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[hsl(123,46%,94%)] text-[hsl(var(--success))] font-semibold mb-6">
            <Lock className="w-4 h-4" aria-hidden="true" /> HIPAA-Secure Intake
          </span>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary tracking-tight mb-4" data-testid="intake-title">Let's get you started</h1>
          <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            This secure form takes about 5 minutes. Your health information is protected under HIPAA and handled only through our encrypted intake system.
          </p>
        </div>

        <div className="flex justify-center mb-10"><TrustBadges /></div>

        {JOTFORM_URL ? (
          <iframe title="CareFlex HIPAA Patient Intake" src={JOTFORM_URL} data-testid="jotform-embed"
            className="w-full min-h-[900px] rounded-xl border border-slate-200 bg-white" allow="geolocation; microphone; camera" />
        ) : (
          <div className="bg-white rounded-2xl border-2 border-dashed border-slate-300 p-10 lg:p-14 text-center" data-testid="jotform-placeholder">
            <ShieldCheck className="w-14 h-14 text-primary mx-auto mb-6" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-bold text-primary mb-3">Secure intake form goes here</h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-xl mx-auto mb-8">
              The HIPAA-compliant Jotform (under CareFlex's signed BAA) will be embedded in this space. Until then, our intake team is one call away — we can complete your intake over the phone in minutes.
            </p>
            <CallButton size="lg" />
            <p className="text-sm text-slate-500 mt-8">
              Please don't send medical details through the website's contact forms. Protected health information is collected only through the secure intake form or by phone.
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
}
