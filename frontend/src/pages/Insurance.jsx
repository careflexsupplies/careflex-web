import { Link } from "react-router-dom";
import { ShieldCheck, FileText, CreditCard, Stethoscope, CheckCircle2 } from "lucide-react";
import Layout, { CallButton, TrustBadges } from "@/components/Layout";
import { usePageMeta } from "@/components/Shared";

const plans = ["Medicare Part B", "Medicare Advantage (most plans)", "Medicaid (Texas)", "Blue Cross Blue Shield", "UnitedHealthcare", "Aetna", "Cigna", "Humana", "Most commercial PPO/HMO plans"];
const required = ["Your insurance card (front and back)", "Your doctor's name and phone number", "A written order / prescription (we can request it for you)", "Your delivery address and phone number"];

export default function Insurance() {
  usePageMeta("Insurance & Medicare", "How Medicare and insurance coverage works for durable medical equipment at CareFlex.");
  return (
    <Layout>
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary tracking-tight mb-6" data-testid="insurance-title">Insurance & Medicare, made simple.</h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8">
              Medicare Part B covers most durable medical equipment at 80% after your deductible. We verify your exact benefits before anything ships, so there are never surprises.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/intake" data-testid="insurance-get-started" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold px-8 py-4 text-lg min-h-[44px] hover:brightness-110 transition-[filter]">Check My Coverage</Link>
              <CallButton size="lg" />
            </div>
            <TrustBadges />
          </div>
          <img src="https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=900&q=80" alt="Doctor holding a stethoscope" className="rounded-2xl shadow-lg w-full object-cover aspect-[5/4]" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <h2 className="font-serif text-3xl font-bold text-primary mb-10">How coverage works</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Stethoscope, title: "1. Doctor's order", text: "Medicare requires a face-to-face visit and a written order from your doctor. Already have one? Great. If not, we contact your doctor's office for you." },
            { icon: FileText, title: "2. We verify & file", text: "Our team checks your benefits, collects documentation, obtains prior authorization if needed, and bills your insurance directly." },
            { icon: CreditCard, title: "3. You pay your share", text: "With Original Medicare you typically pay 20% of the approved amount after your Part B deductible. Supplemental plans often cover that too." },
          ].map((s) => (
            <div key={s.title} className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <s.icon className="w-10 h-10 text-accent mb-4" aria-hidden="true" />
              <h3 className="font-serif text-xl font-semibold text-primary mb-3">{s.title}</h3>
              <p className="text-slate-600 leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 grid lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">Plans we accept</h2>
            <ul className="space-y-3" data-testid="accepted-plans-list">
              {plans.map((p) => (
                <li key={p} className="flex items-center gap-3 text-lg text-slate-700">
                  <ShieldCheck className="w-5 h-5 text-[hsl(var(--success))] shrink-0" aria-hidden="true" />{p}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="font-serif text-3xl font-bold text-primary mb-6">What you'll need</h2>
            <ul className="space-y-3 mb-8" data-testid="required-info-list">
              {required.map((r) => (
                <li key={r} className="flex items-start gap-3 text-lg text-slate-700">
                  <CheckCircle2 className="w-5 h-5 text-accent mt-1 shrink-0" aria-hidden="true" />{r}
                </li>
              ))}
            </ul>
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <p className="text-slate-700 leading-relaxed mb-4 font-semibold">Not sure if you qualify? A 5-minute call answers it.</p>
              <CallButton />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
