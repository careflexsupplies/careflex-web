import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/Layout";
import { usePageMeta } from "@/components/Shared";
import { api } from "@/lib/api";
import { useLang } from "@/i18n";

export default function Blog() {
  const { t } = useLang();
  const [posts, setPosts] = useState([]);
  usePageMeta("Resources & Guides", "Plain-language guides on Medicare coverage, mobility aids, diabetes supplies and more from CareFlex.");

  useEffect(() => {
    api.get("/posts").then((r) => setPosts(r.data));
  }, []);

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary tracking-tight mb-3" data-testid="blog-title">{t("blog_title")}</h1>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl">Plain-language guides to help you understand coverage, compare equipment, and make confident decisions.</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8" data-testid="blog-grid">
          {posts.map((p) => (
            <Link key={p.slug} to={`/blog/${p.slug}`} data-testid={`blog-card-${p.slug}`}
              className="group bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
              <div className="aspect-[16/9] overflow-hidden bg-slate-100">
                <img src={p.image} alt={p.title} loading="lazy" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-300" />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="inline-block self-start px-3 py-1 rounded-full bg-secondary text-primary text-sm font-semibold mb-3">{p.category}</span>
                <h2 className="font-serif text-xl font-semibold text-primary leading-snug mb-3">{p.title}</h2>
                <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">{p.excerpt}</p>
                <span className="mt-auto inline-flex items-center gap-1 text-accent font-semibold">Read guide <ArrowRight className="w-4 h-4" aria-hidden="true" /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </Layout>
  );
}
