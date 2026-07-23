import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, ArrowRight, ClipboardList, FileCheck2, Truck } from "lucide-react";
import { useLang } from "@/i18n";
import { api, trackEvent } from "@/lib/api";
import Layout, { CallButton, TrustBadges } from "@/components/Layout";
import { ProductCard, usePageMeta } from "@/components/Shared";

const HERO_IMG = "https://images.pexels.com/photos/16364307/pexels-photo-16364307.jpeg?auto=compress&w=1200";

export default function Home() {
  const { t, pick } = useLang();
  const [categories, setCategories] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  usePageMeta(null);

  useEffect(() => {
    api.get("/categories").then((r) => setCategories(r.data));
    api.get("/products", { params: { featured: true } }).then((r) => setFeatured(r.data.slice(0, 4)));
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
              <Link to="/intake" data-testid="hero-get-started" onClick={() => trackEvent("cta_click", { cta: "hero_get_started" })}
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

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <h2 className="font-serif text-3xl font-bold text-primary mb-10" data-testid="categories-heading">{t("browse_categories")}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((c) => (
            <Link key={c.slug} to={`/products/category/${c.slug}`} data-testid={`category-tile-${c.slug}`}
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow aspect-[4/5]">
              <img src={c.image} alt={pick(c, "name")} loading="lazy" className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-300" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
              <div className="absolute bottom-0 p-5">
                <h3 className="font-serif text-xl font-bold text-white mb-1">{pick(c, "name")}</h3>
                <p className="text-slate-200 text-sm line-clamp-2">{pick(c, "description")}</p>
              </div>
            </Link>
          ))}
        </div>
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

      {/* Featured products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-20">
        <div className="flex items-center justify-between mb-10">
          <h2 className="font-serif text-3xl font-bold text-primary">{t("featured_title")}</h2>
          <Link to="/products" data-testid="view-all-products" className="text-primary font-semibold inline-flex items-center gap-1 hover:text-accent transition-colors">
            {t("view_all")} <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
