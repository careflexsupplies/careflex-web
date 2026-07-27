import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BadgeCheck, Wallet, Bell, Plus } from "lucide-react";
import { useLang } from "@/i18n";
import { useCart } from "@/context/CartContext";
import { api, trackEvent } from "@/lib/api";
import { toast } from "sonner";

export function usePageMeta(title, description) {
  useEffect(() => {
    document.title = title ? `${title} | CareFlex` : "CareFlex | Medicare-Covered Medical Equipment, Delivered";
    if (description) {
      let m = document.querySelector('meta[name="description"]');
      if (m) m.setAttribute("content", description);
    }
  }, [title, description]);
}

export function CoverageBadge({ coverage }) {
  const { t } = useLang();
  if (coverage === "insurance") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[hsl(123,46%,94%)] text-[hsl(var(--success))] text-sm font-semibold" data-testid="coverage-badge-insurance">
        <BadgeCheck className="w-4 h-4" aria-hidden="true" />{t("covered_badge")}
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 text-amber-800 text-sm font-semibold border border-amber-200" data-testid="coverage-badge-cash">
      <Wallet className="w-4 h-4" aria-hidden="true" />{t("cash_badge")}
    </span>
  );
}

export function ProductCard({ product }) {
  const { addItem } = useCart();
  const add = (e) => {
    e.preventDefault();
    addItem(product);
    trackEvent("add_to_cart", { product: product.slug });
    toast.success(`${product.name} added to cart`);
  };
  return (
    <Link to={`/product/${product.slug}`} data-testid={`product-card-${product.slug}`}
      className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="aspect-[4/3] overflow-hidden bg-slate-100">
        <img src={product.image} alt={product.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <CoverageBadge coverage={product.coverage} />
        <h3 className="font-serif text-lg font-semibold text-primary leading-snug">{product.name}</h3>
        <p className="text-slate-600 text-base line-clamp-2">{product.description}</p>
        {product.coverage === "cash" && product.price != null && (
          <div className="mt-auto flex items-center justify-between gap-3">
            <p className="text-xl font-bold text-slate-900">${product.price.toFixed(2)}</p>
            <button onClick={add} data-testid={`add-to-cart-${product.slug}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-accent text-accent-foreground font-semibold px-4 py-2 min-h-[40px] text-sm hover:brightness-95 transition-[filter]">
              <Plus className="w-4 h-4" aria-hidden="true" /> Add
            </button>
          </div>
        )}
      </div>
    </Link>
  );
}

export function ResupplyOptIn({ defaultCategory = "diabetes-care" }) {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", contact: "", channel: "email", product_category: defaultCategory, cadence: "30" });
  const [done, setDone] = useState(false);
  const submit = async (e) => {
    e.preventDefault();
    await api.post("/subscribers", form);
    trackEvent("resupply_optin", { category: form.product_category });
    setDone(true);
    toast.success(t("resupply_done"));
  };
  return (
    <section className="bg-primary rounded-2xl p-8 sm:p-10 text-white" data-testid="resupply-optin">
      <div className="flex items-start gap-4 mb-6">
        <span className="w-12 h-12 rounded-full bg-accent flex items-center justify-center shrink-0"><Bell className="w-6 h-6" aria-hidden="true" /></span>
        <div>
          <h2 className="font-serif text-2xl font-bold mb-1">{t("resupply_title")}</h2>
          <p className="text-slate-300 text-base leading-relaxed">{t("resupply_sub")}</p>
        </div>
      </div>
      {done ? (
        <p className="text-lg font-semibold text-white" data-testid="resupply-success">{t("resupply_done")}</p>
      ) : (
        <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder={t("your_name")} data-testid="resupply-name-input"
            className="px-4 py-3 rounded-md bg-white text-slate-900 min-h-[44px]" />
          <input required value={form.contact} onChange={(e) => setForm({ ...form, contact: e.target.value })} placeholder={t("phone_or_email")} data-testid="resupply-contact-input"
            className="px-4 py-3 rounded-md bg-white text-slate-900 min-h-[44px]" />
          <select value={form.channel} onChange={(e) => setForm({ ...form, channel: e.target.value })} data-testid="resupply-channel-select"
            className="px-4 py-3 rounded-md bg-white text-slate-900 min-h-[44px]">
            <option value="email">{t("channel_email")}</option>
            <option value="sms">{t("channel_sms")}</option>
          </select>
          <select value={form.cadence} onChange={(e) => setForm({ ...form, cadence: e.target.value })} data-testid="resupply-cadence-select"
            className="px-4 py-3 rounded-md bg-white text-slate-900 min-h-[44px]">
            <option value="30">{t("days_30")}</option>
            <option value="60">{t("days_60")}</option>
            <option value="90">{t("days_90")}</option>
          </select>
          <button type="submit" data-testid="resupply-submit-button" className="px-5 py-3 min-h-[44px] rounded-md bg-accent text-accent-foreground font-semibold hover:brightness-95 transition-[filter]">
            {t("resupply_cta")}
          </button>
        </form>
      )}
    </section>
  );
}
