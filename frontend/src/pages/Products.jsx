import { useState, useEffect } from "react";
import { useParams, Link, useSearchParams } from "react-router-dom";
import { Search } from "lucide-react";
import { useLang } from "@/i18n";
import { api } from "@/lib/api";
import Layout from "@/components/Layout";
import { ProductCard, ResupplyOptIn, usePageMeta } from "@/components/Shared";

export default function Products() {
  const { categorySlug } = useParams();
  const [params] = useSearchParams();
  const { t, pick } = useLang();
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState(params.get("search") || "");
  const [coverage, setCoverage] = useState("");
  const category = categories.find((c) => c.slug === categorySlug);
  usePageMeta(category ? category.name : "Products", category?.description);

  useEffect(() => {
    setSearch(params.get("search") || "");
  }, [params]);

  useEffect(() => {
    api.get("/categories").then((r) => setCategories(r.data));
  }, []);

  useEffect(() => {
    const params = {};
    if (categorySlug) params.category = categorySlug;
    if (coverage) params.coverage = coverage;
    if (search) params.search = search;
    api.get("/products", { params }).then((r) => setProducts(r.data));
  }, [categorySlug, coverage, search]);

  const showResupply = ["diabetes-care", "wound-care"].includes(categorySlug);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12 lg:py-16">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary tracking-tight mb-3" data-testid="products-title">
          {category ? pick(category, "name") : t("products_title")}
        </h1>
        <p className="text-lg text-slate-600 max-w-3xl mb-10">{category ? pick(category, "description") : t("products_sub")}</p>

        {/* Category pills */}
        <div className="flex flex-wrap gap-3 mb-8">
          <Link to="/products" data-testid="category-pill-all"
            className={`px-5 py-2.5 min-h-[44px] inline-flex items-center rounded-full border font-semibold transition-colors ${!categorySlug ? "bg-primary text-white border-primary" : "bg-white text-slate-700 border-slate-300 hover:border-primary"}`}>
            {t("filter_all")}
          </Link>
          {categories.map((c) => (
            <Link key={c.slug} to={`/products/category/${c.slug}`} data-testid={`category-pill-${c.slug}`}
              className={`px-5 py-2.5 min-h-[44px] inline-flex items-center rounded-full border font-semibold transition-colors ${categorySlug === c.slug ? "bg-primary text-white border-primary" : "bg-white text-slate-700 border-slate-300 hover:border-primary"}`}>
              {pick(c, "name")}
            </Link>
          ))}
        </div>

        {/* Search + coverage filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-10">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" aria-hidden="true" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder={t("search_placeholder")} data-testid="product-search-input"
              className="w-full pl-12 pr-4 py-3 min-h-[44px] rounded-full border border-slate-300 bg-white focus:border-primary" />
          </div>
          <div className="flex gap-2" role="group" aria-label="Coverage filter">
            {[["", t("filter_all")], ["insurance", t("filter_covered")], ["cash", t("filter_cash")]].map(([val, label]) => (
              <button key={val} onClick={() => setCoverage(val)} data-testid={`coverage-filter-${val || "all"}`}
                className={`px-4 py-2.5 min-h-[44px] rounded-full border font-semibold text-sm transition-colors ${coverage === val ? "bg-accent text-white border-accent" : "bg-white text-slate-700 border-slate-300 hover:border-accent"}`}>
                {label}
              </button>
            ))}
          </div>
        </div>

        {products.length === 0 ? (
          <p className="text-lg text-slate-500 py-16 text-center" data-testid="no-products-message">{t("no_products")}</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" data-testid="products-grid">
            {products.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        )}

        {showResupply && <div className="mt-16"><ResupplyOptIn defaultCategory={categorySlug} /></div>}
      </div>
    </Layout>
  );
}
