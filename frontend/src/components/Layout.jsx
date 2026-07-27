import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Phone, Menu, X, Printer, Mail, Clock, MapPin, ShieldCheck, HeartPulse, MessageCircle, Search, ShoppingCart, ChevronDown, Truck, Facebook, Instagram, Linkedin } from "lucide-react";
import { useLang } from "@/i18n";
import { useCart } from "@/context/CartContext";
import { PHONE, PHONE_HREF, FAX, EMAIL, SOCIALS, HQAA_SEAL, api, trackEvent } from "@/lib/api";
import { toast } from "sonner";

export function CallButton({ className = "", size = "md" }) {
  const { t } = useLang();
  const pad = size === "lg" ? "px-8 py-4 text-lg" : "px-5 py-3";
  return (
    <a href={PHONE_HREF} data-testid="call-now-button" onClick={() => trackEvent("call_click")}
      className={`inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground font-semibold ${pad} min-h-[44px] hover:brightness-95 transition-[filter] shadow-sm ${className}`}>
      <Phone className="w-5 h-5" aria-hidden="true" />
      <span>{t("call_now")} {PHONE}</span>
    </a>
  );
}

const catNav = [
  { to: "/products", key: "shop_all", testid: "all" },
  { to: "/products/category/diabetes-care", label: "Diabetic Supplies" },
  { to: "/products/category/mobility-aids", label: "Mobility Aids" },
  { to: "/products/category/orthotics", label: "Braces" },
];

export function Logo() {
  const { t } = useLang();
  return (
    <Link to="/" data-testid="header-logo" className="flex items-center gap-3 shrink-0">
      <span className="w-11 h-11 rounded-xl bg-primary flex items-center justify-center shadow-sm">
        <HeartPulse className="w-6 h-6 text-white" aria-hidden="true" />
      </span>
      <span className="leading-tight">
        <span className="block font-serif text-2xl font-bold text-primary">CareFlex</span>
        <span className="block text-xs text-slate-500 font-medium">{t("tagline")}</span>
      </span>
    </Link>
  );
}

function SearchBar({ className = "" }) {
  const { t } = useLang();
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const submit = (e) => {
    e.preventDefault();
    navigate(`/products?search=${encodeURIComponent(q)}`);
  };
  return (
    <form onSubmit={submit} role="search" className={`relative ${className}`} data-testid="header-search-form">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t("search_placeholder")} aria-label="Search products" data-testid="header-search-input"
        className="w-full pl-4 pr-12 py-2.5 min-h-[44px] rounded-full border-2 border-primary/30 bg-white focus:border-primary text-base" />
      <button type="submit" aria-label="Search" data-testid="header-search-button"
        className="absolute right-1 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-primary text-white inline-flex items-center justify-center hover:brightness-110 transition-[filter]">
        <Search className="w-4 h-4" />
      </button>
    </form>
  );
}

export function Header() {
  const { t } = useLang();
  const { toggle } = useLang();
  const { count } = useCart();
  const [open, setOpen] = useState(false);
  const [npOpen, setNpOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      {/* Tier 1 — utility bar */}
      <div className="bg-emerald-950 text-emerald-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-10 flex items-center justify-between gap-4 text-sm">
          <p className="inline-flex items-center gap-2 font-semibold" data-testid="same-day-shipping">
            <Truck className="w-4 h-4 text-accent" aria-hidden="true" />{t("same_day")}
          </p>
          <div className="flex items-center gap-4">
            <a href={PHONE_HREF} data-testid="topbar-phone" onClick={() => trackEvent("call_click")} className="hidden sm:inline-flex items-center gap-1.5 font-semibold hover:text-white">
              <Phone className="w-3.5 h-3.5" aria-hidden="true" />{PHONE}
            </a>
            <span className="hidden md:flex items-center gap-3" data-testid="social-links">
              <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" data-testid="social-facebook" className="hover:text-white"><Facebook className="w-4 h-4" /></a>
              <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" data-testid="social-instagram" className="hover:text-white"><Instagram className="w-4 h-4" /></a>
              <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" data-testid="social-linkedin" className="hover:text-white"><Linkedin className="w-4 h-4" /></a>
            </span>
            <button onClick={toggle} data-testid="language-toggle" className="px-2.5 py-1 rounded border border-emerald-700 text-xs font-bold hover:bg-emerald-900 transition-colors">
              {t("lang_toggle")}
            </button>
          </div>
        </div>
      </div>

      {/* Tier 2 — logo / search / actions */}
      <div className="border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-4">
          <Logo />
          <SearchBar className="hidden md:block flex-1 max-w-xl mx-auto" />
          <div className="flex items-center gap-2 ml-auto">
            <a href={PHONE_HREF} aria-label="Call CareFlex" onClick={() => trackEvent("call_click")} className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-primary text-white">
              <Phone className="w-5 h-5" />
            </a>
            <Link to="/contact" data-testid="header-contact-button"
              className="hidden lg:inline-flex items-center gap-2 rounded-full border-2 border-primary text-primary font-semibold px-5 py-2.5 min-h-[44px] hover:bg-secondary transition-colors">
              {t("contact_us")}
            </Link>
            <Link to="/cart" data-testid="header-cart-button" aria-label={`Cart, ${count} items`}
              className="relative inline-flex items-center justify-center w-11 h-11 rounded-full border-2 border-slate-200 text-primary hover:border-primary transition-colors">
              <ShoppingCart className="w-5 h-5" aria-hidden="true" />
              {count > 0 && <span data-testid="cart-count" className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1 rounded-full bg-accent text-accent-foreground text-xs font-bold flex items-center justify-center">{count}</span>}
            </Link>
            <button onClick={() => setOpen(!open)} data-testid="mobile-menu-button" aria-label="Menu"
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-slate-300">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
        <div className="md:hidden px-4 pb-3"><SearchBar /></div>
      </div>

      {/* Tier 3 — category nav */}
      <nav className="hidden lg:block bg-primary" aria-label="Categories">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center">
          {catNav.map((n) => (
            <NavLink key={n.to} to={n.to} end data-testid={`catnav-${n.testid || n.to.split("/").pop()}`}
              className={({ isActive }) => `px-4 py-3 min-h-[44px] inline-flex items-center text-white font-semibold text-[15px] transition-colors ${isActive ? "bg-emerald-950" : "hover:bg-emerald-900"}`}>
              {n.key ? t(n.key) : n.label}
            </NavLink>
          ))}
          <div className="relative">
            <button onClick={() => setNpOpen(!npOpen)} onBlur={() => setTimeout(() => setNpOpen(false), 150)} data-testid="catnav-new-patient"
              className="px-4 py-3 min-h-[44px] inline-flex items-center gap-1 text-white font-semibold text-[15px] hover:bg-emerald-900 transition-colors" aria-expanded={npOpen}>
              {t("new_patient_form")} <ChevronDown className={`w-4 h-4 transition-transform ${npOpen ? "rotate-180" : ""}`} aria-hidden="true" />
            </button>
            {npOpen && (
              <div className="absolute left-0 top-full bg-white rounded-b-lg shadow-lg border border-slate-200 w-56 py-2 z-50" data-testid="new-patient-dropdown">
                <Link to="/new-patient?plan=medicare" data-testid="np-dropdown-medicare" className="block px-5 py-3 text-slate-700 font-semibold hover:bg-secondary hover:text-primary">Medicare</Link>
                <Link to="/new-patient?plan=ppo" data-testid="np-dropdown-ppo" className="block px-5 py-3 text-slate-700 font-semibold hover:bg-secondary hover:text-primary">Commercial PPO</Link>
              </div>
            )}
          </div>
          <NavLink to="/providers" data-testid="catnav-providers" className={({ isActive }) => `px-4 py-3 min-h-[44px] inline-flex items-center text-white font-semibold text-[15px] transition-colors ${isActive ? "bg-emerald-950" : "hover:bg-emerald-900"}`}>{t("nav_providers")}</NavLink>
          <NavLink to="/about" data-testid="catnav-about" className={({ isActive }) => `px-4 py-3 min-h-[44px] inline-flex items-center text-white font-semibold text-[15px] transition-colors ${isActive ? "bg-emerald-950" : "hover:bg-emerald-900"}`}>{t("nav_about")}</NavLink>
        </div>
      </nav>

      {/* Tier 4 — insurance + promo banner */}
      <div className="bg-secondary border-b border-emerald-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 flex flex-wrap items-center justify-center gap-x-6 gap-y-1.5 text-sm">
          <p className="inline-flex items-center gap-2 font-bold text-primary" data-testid="accept-banner">
            <ShieldCheck className="w-4 h-4" aria-hidden="true" />{t("accept_banner")}
          </p>
          <Link to="/new-patient" data-testid="banner-new-patient-cta"
            className="inline-flex items-center rounded-full bg-primary text-white font-semibold px-4 py-1.5 hover:brightness-110 transition-[filter]">
            {t("new_patient_form")} →
          </Link>
          <p className="inline-flex items-center rounded-full bg-accent/15 text-emerald-950 font-semibold px-4 py-1.5 border border-accent/40" data-testid="promo-banner">
            {t("promo_banner")}
          </p>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="lg:hidden bg-white border-t border-slate-200 px-4 py-3 max-h-[70vh] overflow-y-auto" aria-label="Mobile" data-testid="mobile-menu">
          {catNav.map((n) => (
            <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)} className="block px-3 py-3 rounded-md text-lg font-medium text-slate-700">
              {n.key ? t(n.key) : n.label}
            </NavLink>
          ))}
          <p className="px-3 pt-3 pb-1 text-sm font-bold text-slate-400 uppercase">{t("new_patient_form")}</p>
          <Link to="/new-patient?plan=medicare" onClick={() => setOpen(false)} className="block px-3 py-3 rounded-md text-lg font-medium text-slate-700">Medicare</Link>
          <Link to="/new-patient?plan=ppo" onClick={() => setOpen(false)} className="block px-3 py-3 rounded-md text-lg font-medium text-slate-700">Commercial PPO</Link>
          <NavLink to="/providers" onClick={() => setOpen(false)} className="block px-3 py-3 rounded-md text-lg font-medium text-slate-700">{t("nav_providers")}</NavLink>
          <NavLink to="/about" onClick={() => setOpen(false)} className="block px-3 py-3 rounded-md text-lg font-medium text-slate-700">{t("nav_about")}</NavLink>
          <NavLink to="/contact" onClick={() => setOpen(false)} className="block px-3 py-3 rounded-md text-lg font-medium text-slate-700">{t("contact_us")}</NavLink>
        </nav>
      )}
    </header>
  );
}

export function TrustBadges({ className = "" }) {
  const { t } = useLang();
  const badges = [
    { icon: ShieldCheck, label: t("badge_medicare") },
    { icon: HeartPulse, label: t("badge_hipaa") },
  ];
  return (
    <div className={`flex flex-wrap items-center gap-3 ${className}`} data-testid="trust-badges">
      <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm" data-testid="hqaa-badge">
        <img src={HQAA_SEAL} alt="HQAA Accredited seal" className="w-8 h-8 object-contain" loading="lazy" />
        <span className="text-sm font-semibold text-primary">HQAA Accredited</span>
      </span>
      {badges.map((b) => (
        <span key={b.label} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-semibold text-primary shadow-sm">
          <b.icon className="w-4 h-4 text-[hsl(var(--success))]" aria-hidden="true" />{b.label}
        </span>
      ))}
    </div>
  );
}

function MiniContactForm() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    await api.post("/leads", { type: "contact", source: "footer", ...form });
    trackEvent("form_submit", { form: "footer_contact" });
    setSent(true);
    toast.success(t("thanks"));
  };
  if (sent) return <p className="text-slate-300" data-testid="footer-form-success">{t("thanks")}</p>;
  return (
    <form onSubmit={submit} className="space-y-3" data-testid="footer-contact-form">
      <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("your_name")} data-testid="footer-name-input"
        className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-slate-400" />
      <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder={t("your_email")} data-testid="footer-email-input"
        className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-slate-400" />
      <textarea required rows={2} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder={t("message")} data-testid="footer-message-input"
        className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder:text-slate-400" />
      <button type="submit" data-testid="footer-submit-button" className="px-6 py-3 min-h-[44px] rounded-full bg-accent text-accent-foreground font-semibold hover:brightness-95 transition-[filter]">
        {t("send")}
      </button>
    </form>
  );
}

export function Footer() {
  const { t } = useLang();
  return (
    <footer className="bg-primary text-white mt-auto" data-testid="site-footer">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <HeartPulse className="w-7 h-7 text-accent" aria-hidden="true" />
            <span className="font-serif text-2xl font-bold">CareFlex</span>
          </div>
          <p className="text-slate-300 leading-relaxed mb-4">{t("footer_tag")}</p>
          <div className="flex items-center gap-3 mb-4" data-testid="footer-socials">
            <a href={SOCIALS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="w-10 h-10 rounded-full bg-white/10 inline-flex items-center justify-center hover:bg-white/20 transition-colors"><Facebook className="w-4 h-4" /></a>
            <a href={SOCIALS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="w-10 h-10 rounded-full bg-white/10 inline-flex items-center justify-center hover:bg-white/20 transition-colors"><Instagram className="w-4 h-4" /></a>
            <a href={SOCIALS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-white/10 inline-flex items-center justify-center hover:bg-white/20 transition-colors"><Linkedin className="w-4 h-4" /></a>
          </div>
          <TrustBadges />
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold mb-4">Contact</h3>
          <ul className="space-y-3 text-slate-300">
            <li><a href={PHONE_HREF} className="inline-flex items-center gap-2 hover:text-white transition-colors" data-testid="footer-phone"><Phone className="w-4 h-4" />{PHONE}</a></li>
            <li className="inline-flex items-center gap-2"><Printer className="w-4 h-4" />Fax: {FAX}</li>
            <li><a href={`mailto:${EMAIL}`} className="inline-flex items-center gap-2 hover:text-white transition-colors"><Mail className="w-4 h-4" />{EMAIL}</a></li>
            <li className="inline-flex items-center gap-2"><Clock className="w-4 h-4" />{t("footer_hours")}</li>
            <li className="inline-flex items-start gap-2"><MapPin className="w-4 h-4 mt-1 shrink-0" />Houston, TX — Greater Houston service area</li>
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2 text-slate-300">
            <li><Link to="/products" className="hover:text-white transition-colors">{t("nav_products")}</Link></li>
            <li><Link to="/new-patient" className="hover:text-white transition-colors">{t("new_patient_form")}</Link></li>
            <li><Link to="/insurance" className="hover:text-white transition-colors">{t("nav_insurance")}</Link></li>
            <li><Link to="/intake" className="hover:text-white transition-colors">{t("get_started")}</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors">{t("nav_resources")}</Link></li>
            <li><Link to="/faq" className="hover:text-white transition-colors">{t("nav_faq")}</Link></li>
            <li><Link to="/providers" className="hover:text-white transition-colors">{t("nav_providers")}</Link></li>
            <li><Link to="/service-area" className="hover:text-white transition-colors">{t("service_title")}</Link></li>
            <li><Link to="/admin" className="hover:text-white transition-colors" data-testid="footer-admin-link">Staff Login</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold mb-4">{t("quick_message")}</h3>
          <MiniContactForm />
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row justify-between gap-3 text-sm text-slate-400">
          <p>© {new Date().getFullYear()} CareFlex. All rights reserved. Accredited DME Supplier.</p>
          <p>Privacy Policy · Terms of Service · HIPAA Notice</p>
        </div>
      </div>
    </footer>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  return (
    <div className="fixed bottom-5 right-5 z-40">
      {open && (
        <div className="mb-3 w-72 bg-white rounded-xl shadow-xl border border-slate-200 p-5" data-testid="chat-widget-panel">
          <p className="font-semibold text-primary mb-2">Chat with CareFlex</p>
          <p className="text-sm text-slate-600 mb-3">Live chat launches soon (Tawk.to). For now, call us — we answer fast. Please don't share medical details in chat.</p>
          <CallButton className="w-full justify-center !text-sm !px-3" />
        </div>
      )}
      <button onClick={() => setOpen(!open)} data-testid="chat-widget-button" aria-label="Open chat"
        className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center shadow-lg hover:brightness-110 transition-[filter]">
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <ChatWidget />
    </div>
  );
}
