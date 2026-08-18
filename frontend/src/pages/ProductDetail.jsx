import { useParams, Link } from "react-router-dom";
import { CheckCircle2, ArrowLeft, PackageCheck, ShoppingCart } from "lucide-react";
import { useLang } from "@/i18n";
import { useCart } from "@/context/CartContext";
import { trackEvent } from "@/lib/api";
import { PRODUCTS } from "@/data/content";
import Layout, { CallButton, TrustBadges } from "@/components/Layout";
import { CoverageBadge, ResupplyOptIn, usePageMeta } from "@/components/Shared";
import { toast } from "sonner";

export default function ProductDetail() {
  const { slug } = useParams();
  const { t } = useLang();
  const { addItem } = useCart();
  const product = PRODUCTS.find((p) => p.slug === slug);
  usePageMeta(product?.name, product?.description);

  if (!product) return <Layout><div className="max-w-4xl mx-auto px-4 py-24 text-center text-xl text-slate-600">Product not found. <Link to="/products" className="text-primary underline">Browse catalog</Link></div></Layout>;

  const resupplyEligible = ["diabetes-care", "wound-care"].includes(product.category_slug);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <Link to={`/products/category/${product.category_slug}`} data-testid="back-to-category" className="inline-flex items-center gap-2 text-primary font-semibold mb-8 hover:text-accent transition-colors">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> Back to category
        </Link>
        <div className="grid lg:grid-cols-2 gap-12">
          <div className="rounded-2xl overflow-hidden border border-slate-200 bg-white">
            <img src={product.image} alt={product.name} className="w-full aspect-[4/3] object-cover" />
          </div>
          <div>
            <CoverageBadge coverage={product.coverage} />
            <h1 className="font-serif text-4xl font-bold text-primary tracking-tight mt-4 mb-4" data-testid="product-name">{product.name}</h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-6" data-testid="product-description">{product.description}</p>
            {product.coverage === "cash" && product.price != null && (
              <p className="text-3xl font-bold text-slate-900 mb-6" data-testid="product-price">${product.price.toFixed(2)}</p>
            )}
            {product.features?.length > 0 && (
              <ul className="space-y-3 mb-8">
                {product.features.map((f, i) => (
                  <li key={i} className="flex items-start gap-3 text-slate-700 text-base">
                    <CheckCircle2 className="w-5 h-5 text-[hsl(var(--success))] mt-0.5 shrink-0" aria-hidden="true" />{f}
                  </li>
                ))}
              </ul>
            )}
            <div className="flex items-center gap-2 mb-8 text-slate-700">
              <PackageCheck className="w-5 h-5 text-[hsl(var(--success))]" aria-hidden="true" />
              <span className="font-semibold" data-testid="product-stock">{product.in_stock ? "In stock — ships in 2–5 business days" : "Currently out of stock — call for availability"}</span>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {product.coverage === "cash" && product.price != null && (
                <button onClick={() => { addItem(product); trackEvent("add_to_cart", { product: product.slug }); toast.success(`${product.name} added to cart`); }}
                  data-testid="detail-add-to-cart"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-accent text-accent-foreground font-semibold px-8 py-4 text-lg min-h-[44px] hover:brightness-95 transition-[filter]">
                  <ShoppingCart className="w-5 h-5" aria-hidden="true" /> Add to Cart
                </button>
              )}
              <Link to={product.coverage === "insurance" ? "/new-patient" : "/intake"} data-testid="check-eligibility-button" onClick={() => trackEvent("cta_click", { cta: "check_eligibility", product: product.slug })}
                className="inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold px-8 py-4 text-lg min-h-[44px] hover:brightness-110 transition-[filter]">
                {t("check_eligibility")}
              </Link>
              <CallButton size="lg" />
            </div>
            <TrustBadges />
            {product.coverage === "insurance" && (
              <p className="mt-6 text-sm text-slate-500 leading-relaxed">
                Insurance-covered items require a doctor's prescription and benefit verification. We handle both — start with the eligibility check above or call us.
              </p>
            )}
          </div>
        </div>
        {resupplyEligible && <div className="mt-16"><ResupplyOptIn defaultCategory={product.category_slug} /></div>}
      </div>
    </Layout>
  );
}
