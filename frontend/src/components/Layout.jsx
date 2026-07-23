import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { Phone, Menu, X, Printer, Mail, Clock, MapPin, ShieldCheck, Award, HeartPulse, MessageCircle } from "lucide-react";
import { useLang } from "@/i18n";
import { PHONE, PHONE_HREF, FAX, EMAIL, api, trackEvent } from "@/lib/api";
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

const navItems = [
  { to: "/", key: "nav_home" },
  { to: "/products", key: "nav_products" },
  { to: "/insurance", key: "nav_insurance" },
  { to: "/providers", key: "nav_providers" },
  { to: "/blog", key: "nav_resources" },
  { to: "/faq", key: "nav_faq" },
  { to: "/about", key: "nav_about" },
  { to: "/contact", key: "nav_contact" },
];

export function Header() {
  const { t, toggle } = useLang();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 lg:h-20 gap-4">
          <Link to="/" data-testid="header-logo" className="flex items-center gap-2 shrink-0">
            <HeartPulse className="w-8 h-8 text-accent" aria-hidden="true" />
            <span className="font-serif text-2xl font-bold text-primary">CareFlex</span>
          </Link>
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main">
            {navItems.map((n) => (
              <NavLink key={n.to} to={n.to} data-testid={`nav-${n.key}`}
                className={({ isActive }) => `px-3 py-2 rounded-md text-base font-medium transition-colors ${isActive ? "text-primary bg-secondary" : "text-slate-600 hover:text-primary hover:bg-secondary"}`}>
                {t(n.key)}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <button onClick={toggle} data-testid="language-toggle" className="px-3 py-2 min-h-[44px] rounded-md border border-slate-300 text-sm font-semibold text-primary hover:bg-secondary transition-colors">
              {t("lang_toggle")}
            </button>
            <a href={PHONE_HREF} data-testid="header-call-button" onClick={() => trackEvent("call_click")}
              className="hidden sm:inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground font-semibold px-4 py-2.5 min-h-[44px] hover:brightness-95 transition-[filter]">
              <Phone className="w-4 h-4" aria-hidden="true" /><span className="whitespace-nowrap">{PHONE}</span>
            </a>
            <a href={PHONE_HREF} aria-label="Call CareFlex" className="sm:hidden inline-flex items-center justify-center w-11 h-11 rounded-full bg-accent text-accent-foreground">
              <Phone className="w-5 h-5" />
            </a>
            <button onClick={() => setOpen(!open)} data-testid="mobile-menu-button" aria-label="Menu"
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-md border border-slate-300">
              {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>
      {open && (
        <nav className="lg:hidden bg-white border-t border-slate-200 px-4 py-3" aria-label="Mobile" data-testid="mobile-menu">
          {navItems.map((n) => (
            <NavLink key={n.to} to={n.to} onClick={() => setOpen(false)}
              className={`block px-3 py-3 rounded-md text-lg font-medium ${location.pathname === n.to ? "text-primary bg-secondary" : "text-slate-700"}`}>
              {t(n.key)}
            </NavLink>
          ))}
          <Link to="/intake" onClick={() => setOpen(false)} className="block mt-2 px-3 py-3 rounded-md bg-primary text-primary-foreground text-lg font-semibold text-center">
            {t("get_started")}
          </Link>
        </nav>
      )}
    </header>
  );
}

export function TrustBadges({ className = "" }) {
  const { t } = useLang();
  const badges = [
    { icon: Award, label: t("badge_accredited") },
    { icon: ShieldCheck, label: t("badge_medicare") },
    { icon: HeartPulse, label: t("badge_hipaa") },
  ];
  return (
    <div className={`flex flex-wrap gap-3 ${className}`} data-testid="trust-badges">
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
            <li><Link to="/insurance" className="hover:text-white transition-colors">{t("nav_insurance")}</Link></li>
            <li><Link to="/intake" className="hover:text-white transition-colors">{t("get_started")}</Link></li>
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
