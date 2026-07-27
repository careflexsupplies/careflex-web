import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, ClipboardList, FileCheck2, Truck } from "lucide-react";
import { useLang } from "@/i18n";
import { api, trackEvent } from "@/lib/api";
import Layout, { CallButton, TrustBadges } from "@/components/Layout";
import { ProductCard, usePageMeta } from "@/components/Shared";

const HERO_IMG = "https://images.pexels.com/photos/16364307/pexels-photo-16364307.jpeg?auto=compress&w=1200";

const FEATURE_CARDS = [
  { slug: "diabetes-care", title: "Glucose Monitors", sub: "CGM Devices", desc: "Continuous glucose monitors, meters, test strips and lancets — insurance billed, delivered monthly.", img: "https://images.pexels.com/photos/4386466/pexels-photo-4386466.jpeg?auto=compress&w=900" },
  { slug: "mobility-aids", title: "Mobility Aids", sub: "Wheelchairs, Rollators, Walkers", desc: "Get moving safely with Medicare-covered wheelchairs, rollators, walkers and canes.", img: "https://images.pexels.com/photos/6194680/pexels-photo-6194680.jpeg?auto=compress&w=900" },
  { slug: "orthotics", title: "Braces", sub: "Knee, Back, Ankle & Wrist", desc: "Off-the-shelf orthoses fitted for comfort — covered with a physician's order.", img: "https://images.pexels.com/photos/6941883/pexels-photo-6941883.jpeg?auto=compress&w=900" },
];

export default function Home() {
  const { t, pick } = useLang();
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  usePageMeta(null);

  useEffect(() => {
    api.get("/categories").then((r) => setCategories(r.data));
    api.get("/products").then((r) => setFeatured(r.data.slice(0, 12)));
    api.get("/testimonials").then((r) => setTestimonials(r.data));
  }, []);

  const steps = [
    { icon: ClipboardList, title: t("how_1t"), desc: t("how_1d") },
    { icon: FileCheck2, title: t("how_2t"), desc: t("how_2d") },
    { icon: Truck, title: t("how_3t"), desc: t("how_3d") },
  ];

  return (
    <Layout>
      {/* Hero */}
      <section className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-[1.1] tracking-tight mb-6" data-testid="hero-title">
              {t("hero_title")}
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">{t("hero_sub")}</p>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Link to="/new-patient" data-testid="hero-get-started" onClick={() => trackEvent("cta_click", { cta: "hero_get_started" })}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary text-primary-foreground font-semibold px-8 py-4 text-lg min-h-[44px] hover:brightness-110 transition-[filter] shadow-sm">
                {t("hero_cta1")} <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Link>
              <CallButton size="lg" />
            </div>
            <TrustBadges />
          </div>
          <div className="relative">
            <img src={HERO_IMG} alt="Caregiver helping an elderly woman at home" className="rounded-2xl shadow-lg w-full object-cover aspect-[5/4]" />
            <div className="absolute -bottom-5 left-6 bg-white rounded-xl shadow-lg border border-slate-200 px-5 py-3 flex items-center gap-2">
              <span className="flex">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />)}</span>
              <span className="text-sm font-semibold text-slate-700">Rated 4.9 by 500+ patients</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category feature cards (Wonace-style) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <h2 className="font-serif text-3xl font-bold text-primary mb-10" data-testid="categories-heading">{t("browse_categories")}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {FEATURE_CARDS.map((c) => (
            <Link key={c.slug} to={`/products/category/${c.slug}`} data-testid={`category-tile-${c.slug}`}
              className="group bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col">
              <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                <img src={c.img} alt={c.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-serif text-2xl font-bold text-primary mb-1">{c.title}</h3>
                <p className="text-slate-500 font-medium mb-2">{c.sub}</p>
                <p className="text-slate-600 leading-relaxed mb-5">{c.desc}</p>
                <span className="mt-auto inline-flex items-center justify-center self-start gap-2 rounded-full bg-primary text-white font-semibold px-6 py-2.5 min-h-[44px] group-hover:brightness-110 transition-[filter]">
                  Shop Now <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </span>
              </div>
            </Link>
          ))}
        </div>
        {categories.length > 3 && (
          <div className="mt-8 flex flex-wrap gap-3">
            {categories.filter((c) => !FEATURE_CARDS.some((f) => f.slug === c.slug)).map((c) => (
              <Link key={c.slug} to={`/products/category/${c.slug}`} data-testid={`category-chip-${c.slug}`}
                className="px-5 py-2.5 min-h-[44px] inline-flex items-center rounded-full border border-slate-300 bg-white font-semibold text-slate-700 hover:border-primary hover:text-primary transition-colors">
                {pick(c, "name")}
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* How it works */}
      <section className="bg-secondary/60 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <h2 className="font-serif text-3xl font-bold text-primary mb-2">{t("how_title")}</h2>
          <p className="text-lg text-slate-600 mb-12">{t("how_sub")}</p>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-8 shadow-sm" data-testid={`how-step-${i + 1}`}>
                <div className="flex items-center gap-4 mb-4">
                  <span className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center font-bold text-lg">{i + 1}</span>
                  <s.icon className="w-8 h-8 text-primary" aria-hidden="true" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-primary mb-2">{s.title}</h3>
                <p className="text-slate-600 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick-shop product grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-3xl font-bold text-primary">Shop popular products</h2>
          <Link to="/products" data-testid="view-all-products" className="text-primary font-semibold inline-flex items-center gap-1 hover:text-accent transition-colors">
            {t("view_all")} <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" data-testid="quick-shop-grid">
          {featured.map((p) => <ProductCard key={p.slug} product={p} />)}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
          <h2 className="font-serif text-3xl font-bold text-white mb-12">{t("testimonials_title")}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((tm) => (
              <figure key={tm.id} className="bg-white/5 border border-white/10 rounded-xl p-6" data-testid={`testimonial-${tm.order}`}>
                <span className="flex mb-3">{[...Array(tm.rating || 5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" aria-hidden="true" />)}</span>
                <blockquote className="text-slate-200 leading-relaxed mb-4">"{pick(tm, "text")}"</blockquote>
                <figcaption className="text-white font-semibold">{tm.name}<span className="block text-slate-400 text-sm font-normal">{tm.location}</span></figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div>
            <h2 className="font-serif text-3xl font-bold text-primary mb-2">Ready to get your equipment covered?</h2>
            <p className="text-lg text-slate-600">Free benefit check. No obligation. Answers in minutes.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/intake" data-testid="cta-band-get-started" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold px-8 py-4 text-lg min-h-[44px] hover:brightness-110 transition-[filter]">
              {t("get_started")}
            </Link>
            <CallButton size="lg" />
          </div>
        </div>
      </section>
    </Layout>
  );
}
