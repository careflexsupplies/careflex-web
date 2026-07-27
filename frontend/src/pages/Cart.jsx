import { useState } from "react";
import { Link } from "react-router-dom";
import { Trash2, Minus, Plus, ShoppingCart, CheckCircle2, Tag } from "lucide-react";
import Layout, { CallButton } from "@/components/Layout";
import { usePageMeta } from "@/components/Shared";
import { useCart } from "@/context/CartContext";
import { api, PROMO_CODE, PROMO_DISCOUNT, trackEvent } from "@/lib/api";
import { toast } from "sonner";

export default function Cart() {
  usePageMeta("Your Cart", "Review your cash-pay medical supplies and request your order from CareFlex.");
  const { items, removeItem, updateQty, clear, subtotal } = useCart();
  const [promo, setPromo] = useState("");
  const [applied, setApplied] = useState(false);
  const [form, setForm] = useState({ name: "", phone: "", email: "" });
  const [done, setDone] = useState(false);

  const discount = applied ? subtotal * PROMO_DISCOUNT : 0;
  const total = subtotal - discount;

  const applyPromo = () => {
    if (promo.trim().toUpperCase() === PROMO_CODE) {
      setApplied(true);
      toast.success(`Code ${PROMO_CODE} applied — 10% off!`);
    } else {
      toast.error("That code isn't valid.");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/leads", {
        type: "order", ...form,
        items: items.map((i) => `${i.qty}x ${i.name} ($${i.price})`).join("; "),
        promo_code: applied ? PROMO_CODE : null,
        total: Number(total.toFixed(2)),
        message: `Cash-pay order request — total $${total.toFixed(2)}${applied ? ` (promo ${PROMO_CODE})` : ""}`,
      });
      trackEvent("form_submit", { form: "order_request", total });
      clear();
      setDone(true);
    } catch {
      toast.error("Something went wrong. Please try again or call us.");
    }
  };

  const inputCls = "w-full px-4 py-3 min-h-[44px] rounded-md border border-slate-300 bg-white focus:border-primary";

  return (
    <Layout>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-14 lg:py-16">
        <h1 className="font-serif text-4xl font-bold text-primary tracking-tight mb-8" data-testid="cart-title">Your Cart</h1>

        {done ? (
          <div className="bg-secondary rounded-2xl p-10 text-center" data-testid="order-success">
            <CheckCircle2 className="w-14 h-14 text-primary mx-auto mb-4" aria-hidden="true" />
            <h2 className="font-serif text-2xl font-bold text-primary mb-3">Order request received!</h2>
            <p className="text-lg text-slate-600 mb-6">Our team will call to confirm payment and delivery — usually within one business day.</p>
            <CallButton size="lg" />
          </div>
        ) : items.length === 0 ? (
          <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center" data-testid="cart-empty">
            <ShoppingCart className="w-12 h-12 text-slate-300 mx-auto mb-4" aria-hidden="true" />
            <p className="text-lg text-slate-600 mb-6">Your cart is empty. Cash-pay items can be added straight from the catalog.</p>
            <Link to="/products" data-testid="cart-browse-link" className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold px-8 py-4 min-h-[44px] hover:brightness-110 transition-[filter]">Browse products</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 space-y-4" data-testid="cart-items">
              {items.map((i) => (
                <div key={i.slug} className="bg-white rounded-xl border border-slate-200 p-4 flex items-center gap-4" data-testid={`cart-item-${i.slug}`}>
                  <img src={i.image} alt={i.name} className="w-20 h-20 rounded-lg object-cover shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-slate-900 truncate">{i.name}</p>
                    <p className="text-primary font-bold">${i.price?.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center gap-1">
                    <button onClick={() => updateQty(i.slug, i.qty - 1)} aria-label="Decrease" data-testid={`cart-dec-${i.slug}`} className="w-10 h-10 rounded-md border border-slate-300 inline-flex items-center justify-center hover:bg-secondary"><Minus className="w-4 h-4" /></button>
                    <span className="w-8 text-center font-semibold" data-testid={`cart-qty-${i.slug}`}>{i.qty}</span>
                    <button onClick={() => updateQty(i.slug, i.qty + 1)} aria-label="Increase" data-testid={`cart-inc-${i.slug}`} className="w-10 h-10 rounded-md border border-slate-300 inline-flex items-center justify-center hover:bg-secondary"><Plus className="w-4 h-4" /></button>
                  </div>
                  <button onClick={() => removeItem(i.slug)} aria-label="Remove" data-testid={`cart-remove-${i.slug}`} className="w-10 h-10 rounded-md text-red-600 hover:bg-red-50 inline-flex items-center justify-center"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
            </div>

            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" aria-hidden="true" />
                    <input value={promo} onChange={(e) => setPromo(e.target.value)} placeholder="Promo code" data-testid="promo-input"
                      className="w-full pl-9 pr-3 py-3 min-h-[44px] rounded-md border border-slate-300 uppercase" disabled={applied} />
                  </div>
                  <button onClick={applyPromo} disabled={applied} data-testid="promo-apply-button"
                    className="px-5 py-3 min-h-[44px] rounded-md bg-accent text-accent-foreground font-semibold hover:brightness-95 transition-[filter] disabled:opacity-50">
                    {applied ? "Applied" : "Apply"}
                  </button>
                </div>
                <div className="space-y-2 text-slate-700 border-t border-slate-100 pt-4">
                  <p className="flex justify-between"><span>Subtotal</span><span data-testid="cart-subtotal">${subtotal.toFixed(2)}</span></p>
                  {applied && <p className="flex justify-between text-primary font-semibold"><span>{PROMO_CODE} (−10%)</span><span data-testid="cart-discount">−${discount.toFixed(2)}</span></p>}
                  <p className="flex justify-between text-xl font-bold text-slate-900"><span>Total</span><span data-testid="cart-total">${total.toFixed(2)}</span></p>
                </div>
                <form onSubmit={submit} className="space-y-3 border-t border-slate-100 pt-4" data-testid="order-form">
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Full name *" className={inputCls} data-testid="order-name-input" />
                  <input required type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone *" className={inputCls} data-testid="order-phone-input" />
                  <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email *" className={inputCls} data-testid="order-email-input" />
                  <button type="submit" data-testid="order-submit-button"
                    className="w-full rounded-full bg-primary text-primary-foreground font-semibold px-6 py-4 text-lg min-h-[44px] hover:brightness-110 transition-[filter]">
                    Request Order
                  </button>
                  <p className="text-xs text-slate-500">No payment taken online. Our team calls to confirm payment, shipping and any coverage options before anything is charged.</p>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
