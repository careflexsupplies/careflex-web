import { useState } from "react";
import { Phone, Printer, Mail, Clock, MapPin, CheckCircle2 } from "lucide-react";
import Layout, { CallButton } from "@/components/Layout";
import { usePageMeta } from "@/components/Shared";
import { submitForm, PHONE, PHONE_HREF, MAIN_PHONE, MAIN_PHONE_HREF, FAX, EMAIL, trackEvent } from "@/lib/api";
import { toast } from "sonner";
import { useLang } from "@/i18n";

export default function Contact() {
  usePageMeta("Contact Us", "Contact CareFlex — call, fax, email, or send a message. Serving Greater Houston Mon–Fri 8 AM – 6 PM.");
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", phone: "", message: "" });
  const [sent, setSent] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    try {
      await submitForm("Contact form", form);
      trackEvent("form_submit", { form: "contact_page" });
      setSent(true);
      toast.success(t("thanks"));
    } catch {
      toast.error("Something went wrong. Please try again or call us.");
    }
  };

  const inputCls = "w-full px-4 py-3 min-h-[44px] rounded-md border border-slate-300 bg-white focus:border-primary";

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary tracking-tight mb-3" data-testid="contact-title">Contact us</h1>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl">Questions about coverage, an order, or a delivery? We answer fast — usually on the first ring.</p>

        <div className="grid lg:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-5">
              <a href={PHONE_HREF} className="flex items-center gap-4 text-lg" data-testid="contact-phone">
                <span className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-accent" aria-hidden="true" /></span>
                <span><span className="block font-semibold text-primary">{PHONE}</span><span className="text-slate-500 text-base">Call now — tap to call on mobile</span></span>
              </a>
              <a href={MAIN_PHONE_HREF} className="flex items-center gap-4 text-lg" data-testid="contact-main-phone">
                <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Phone className="w-5 h-5 text-primary" aria-hidden="true" /></span>
                <span><span className="block font-semibold text-primary">Main office: {MAIN_PHONE}</span><span className="text-slate-500 text-base">Billing & general inquiries</span></span>
              </a>
              <p className="flex items-center gap-4 text-lg">
                <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Printer className="w-5 h-5 text-primary" aria-hidden="true" /></span>
                <span><span className="block font-semibold text-primary">Fax: {FAX}</span><span className="text-slate-500 text-base">Provider referrals & prescriptions</span></span>
              </p>
              <a href={`mailto:${EMAIL}`} className="flex items-center gap-4 text-lg" data-testid="contact-email">
                <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Mail className="w-5 h-5 text-primary" aria-hidden="true" /></span>
                <span className="font-semibold text-primary">{EMAIL}</span>
              </a>
              <p className="flex items-center gap-4 text-lg">
                <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><Clock className="w-5 h-5 text-primary" aria-hidden="true" /></span>
                <span className="font-semibold text-primary" data-testid="contact-hours">{t("contact_hours")}<span className="block text-slate-500 text-base font-normal">{t("footer_hours")}</span></span>
              </p>
              <p className="flex items-center gap-4 text-lg">
                <span className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0"><MapPin className="w-5 h-5 text-primary" aria-hidden="true" /></span>
                <span className="font-semibold text-primary">Houston, TX <span className="block text-slate-500 text-base font-normal">Exact address will be added with brand assets</span></span>
              </p>
            </div>
            <iframe
              title="CareFlex location map"
              src="https://www.google.com/maps?q=Houston,+TX&output=embed"
              className="w-full h-72 rounded-2xl border border-slate-200"
              loading="lazy"
              data-testid="google-map-embed"
            />
          </div>

          <div>
            {sent ? (
              <div className="bg-[hsl(123,46%,94%)] rounded-2xl p-10 text-center" data-testid="contact-success">
                <CheckCircle2 className="w-12 h-12 text-[hsl(var(--success))] mx-auto mb-4" aria-hidden="true" />
                <p className="text-xl font-semibold text-primary">{t("thanks")}</p>
              </div>
            ) : (
              <form onSubmit={submit} className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 space-y-5" data-testid="contact-form">
                <p className="text-sm text-slate-500 bg-secondary rounded-md px-4 py-3">For your privacy, please don't include medical details here. Health information is collected only through our <a href="/intake" className="underline text-primary">secure intake form</a>.</p>
                <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="c-name">{t("your_name")} *</label>
                  <input id="c-name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className={inputCls} data-testid="contact-name-input" /></div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="c-email">{t("your_email")} *</label>
                    <input id="c-email" required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className={inputCls} data-testid="contact-email-input" /></div>
                  <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="c-phone">Phone</label>
                    <input id="c-phone" type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className={inputCls} data-testid="contact-phone-input" /></div>
                </div>
                <div><label className="block font-semibold text-slate-700 mb-2" htmlFor="c-msg">{t("message")} *</label>
                  <textarea id="c-msg" required rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className={inputCls} data-testid="contact-message-input" /></div>
                <button type="submit" data-testid="contact-submit-button"
                  className="w-full rounded-full bg-primary text-primary-foreground font-semibold px-8 py-4 text-lg min-h-[44px] hover:brightness-110 transition-[filter]">
                  {t("send")}
                </button>
              </form>
            )}
            <div className="mt-8"><CallButton size="lg" className="w-full justify-center" /></div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
