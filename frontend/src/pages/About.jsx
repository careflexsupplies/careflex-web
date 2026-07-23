import { Award, Users, MapPin, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Layout, { CallButton, TrustBadges } from "@/components/Layout";
import { usePageMeta } from "@/components/Shared";

const team = [
  { name: "Placeholder — Founder & CEO", desc: "20+ years in home medical equipment and patient advocacy." },
  { name: "Placeholder — Clinical Liaison, RN", desc: "Coordinates with physicians and discharge planners for smooth transitions." },
  { name: "Placeholder — Billing & Benefits Lead", desc: "Certified in Medicare DMEPOS billing and prior authorization." },
];

export default function About() {
  usePageMeta("About Us", "CareFlex is an accredited durable medical equipment supplier serving Greater Houston with Medicare-covered equipment and white-glove service.");
  return (
    <Layout>
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary tracking-tight mb-6" data-testid="about-title">Care first. Paperwork second. Always.</h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6">
              CareFlex was founded on a simple belief: getting the medical equipment your doctor prescribed shouldn't require a fight with paperwork. We're an accredited DME supplier serving the Greater Houston region — handling insurance verification, documentation, and delivery so patients and caregivers can focus on recovery.
            </p>
            <TrustBadges className="mb-8" />
            <CallButton size="lg" />
          </div>
          <img src="https://images.unsplash.com/photo-1762955911431-4c44c7c3f408?w=900&q=80" alt="Caregiver assisting an elderly couple" className="rounded-2xl shadow-lg w-full object-cover aspect-[5/4]" />
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { icon: Award, title: "Accredited & Compliant", text: "Fully accredited DME supplier meeting Medicare DMEPOS quality standards. HIPAA-secure processes across every patient touchpoint." },
            { icon: Users, title: "A Team That Answers", text: "Real people answer our phones Mon–Fri, 8 AM – 6 PM. Bilingual support in English and Spanish." },
            { icon: MapPin, title: "Local to Greater Houston", text: "We deliver across 8 counties with our own delivery team — including setup help and equipment walkthroughs." },
          ].map((c) => (
            <div key={c.title} className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
              <c.icon className="w-10 h-10 text-accent mb-4" aria-hidden="true" />
              <h3 className="font-serif text-xl font-semibold text-primary mb-3">{c.title}</h3>
              <p className="text-slate-600 leading-relaxed">{c.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-secondary/60 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
          <h2 className="font-serif text-3xl font-bold text-primary mb-10">Our team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((m) => (
              <div key={m.name} className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ShieldCheck className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-lg font-semibold text-primary mb-2">{m.name}</h3>
                <p className="text-slate-600 leading-relaxed">{m.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-sm text-slate-500 mt-8">Team photos and bios will be updated once brand assets are provided.</p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 text-center">
        <h2 className="font-serif text-3xl font-bold text-primary mb-4">Serving 8 counties across Greater Houston</h2>
        <p className="text-lg text-slate-600 mb-8">Free delivery, setup, and equipment education included with every covered order.</p>
        <Link to="/service-area" data-testid="about-service-area-link" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold px-8 py-4 text-lg min-h-[44px] hover:brightness-110 transition-[filter]">
          See our full service area
        </Link>
      </section>
    </Layout>
  );
}
