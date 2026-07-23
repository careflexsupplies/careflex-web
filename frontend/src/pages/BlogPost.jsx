import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Layout, { CallButton } from "@/components/Layout";
import { usePageMeta, ProductCard } from "@/components/Shared";
import { api } from "@/lib/api";

function renderContent(content) {
  return content.split("\n").map((line, i) => {
    if (line.startsWith("## ")) return <h2 key={i}>{line.slice(3)}</h2>;
    if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, "");
      return <li key={i}>{renderInline(text)}</li>;
    }
    if (line.startsWith("- ")) return <li key={i}>{renderInline(line.slice(2))}</li>;
    if (line.trim() === "") return null;
    return <p key={i}>{renderInline(line)}</p>;
  });
}

function renderInline(text) {
  const parts = text.split(/\*\*(.+?)\*\*/g);
  return parts.map((part, i) => (i % 2 === 1 ? <strong key={i}>{part}</strong> : part));
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [related, setRelated] = useState([]);
  usePageMeta(post?.seo_title || post?.title, post?.seo_description);

  useEffect(() => {
    api.get(`/posts/${slug}`).then((r) => setPost(r.data)).catch(() => setPost(false));
    api.get("/products", { params: { featured: true } }).then((r) => setRelated(r.data.slice(0, 3)));
  }, [slug]);

  if (post === false) return <Layout><div className="max-w-3xl mx-auto px-4 py-24 text-center text-xl text-slate-600">Article not found. <Link to="/blog" className="text-primary underline">Back to resources</Link></div></Layout>;
  if (!post) return <Layout><div className="max-w-3xl mx-auto px-4 py-24 text-center text-slate-500">Loading…</div></Layout>;

  return (
    <Layout>
      <article className="max-w-3xl mx-auto px-4 sm:px-6 py-14">
        <Link to="/blog" data-testid="back-to-blog" className="inline-flex items-center gap-2 text-primary font-semibold mb-8 hover:text-accent transition-colors">
          <ArrowLeft className="w-4 h-4" aria-hidden="true" /> All resources
        </Link>
        <span className="inline-block px-3 py-1 rounded-full bg-secondary text-primary text-sm font-semibold mb-4">{post.category}</span>
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary tracking-tight leading-[1.15] mb-4" data-testid="post-title">{post.title}</h1>
        <p className="text-slate-500 mb-8">By {post.author}</p>
        <img src={post.image} alt={post.title} className="w-full rounded-2xl aspect-[16/9] object-cover mb-10" />
        <div className="prose-blog" data-testid="post-content">{renderContent(post.content)}</div>
        <div className="mt-12 bg-secondary rounded-2xl p-8 text-center">
          <p className="font-serif text-xl font-bold text-primary mb-4">Have questions about your coverage?</p>
          <CallButton size="lg" />
        </div>
      </article>
      {related.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16">
          <h2 className="font-serif text-2xl font-bold text-primary mb-8">Related equipment</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {related.map((p) => <ProductCard key={p.slug} product={p} />)}
          </div>
        </section>
      )}
    </Layout>
  );
}
