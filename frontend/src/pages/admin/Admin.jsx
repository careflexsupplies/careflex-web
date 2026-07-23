import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { HeartPulse, LayoutDashboard, Package, FolderTree, FileText, HelpCircle, Star, MapPin, Inbox, Bell, LogOut, ExternalLink } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/lib/api";
import ResourceManager from "./ResourceManager";
import LeadsInbox from "./LeadsInbox";

const coverageOpts = [{ value: "insurance", label: "Medicare/Insurance Covered" }, { value: "cash", label: "Cash-Pay" }];
const categoryOpts = [
  { value: "mobility-aids", label: "Mobility Aids" }, { value: "orthotics", label: "Orthotics" },
  { value: "diabetes-care", label: "Diabetes Care" }, { value: "wound-care", label: "Wound Care" },
];

const productFields = [
  { key: "name", label: "Name", required: true, showInTable: true },
  { key: "slug", label: "Slug (url-friendly)", required: true, showInTable: true },
  { key: "category_slug", label: "Category", type: "select", options: categoryOpts, default: "mobility-aids", showInTable: true },
  { key: "coverage", label: "Coverage", type: "select", options: coverageOpts, default: "insurance", showInTable: true },
  { key: "price", label: "Price (cash-pay only)", type: "number" },
  { key: "image", label: "Image URL" },
  { key: "description", label: "Description", type: "textarea" },
  { key: "features", label: "Features", type: "list" },
  { key: "in_stock", label: "In stock", type: "boolean", default: true },
  { key: "featured", label: "Featured on homepage", type: "boolean" },
];

const categoryFields = [
  { key: "name", label: "Name", required: true, showInTable: true },
  { key: "name_es", label: "Name (Spanish)" },
  { key: "slug", label: "Slug", required: true, showInTable: true },
  { key: "image", label: "Image URL" },
  { key: "description", label: "Description", type: "textarea", showInTable: true },
  { key: "description_es", label: "Description (Spanish)", type: "textarea" },
  { key: "order", label: "Sort order", type: "number", default: 1 },
];

const postFields = [
  { key: "title", label: "Title", required: true, showInTable: true },
  { key: "slug", label: "Slug", required: true, showInTable: true },
  { key: "category", label: "Category", showInTable: true },
  { key: "author", label: "Author", default: "CareFlex Team" },
  { key: "image", label: "Image URL" },
  { key: "excerpt", label: "Excerpt", type: "textarea" },
  { key: "content", label: "Content (## for headings, - for lists, **bold**)", type: "textarea", rows: 10 },
  { key: "seo_title", label: "SEO Title" },
  { key: "seo_description", label: "SEO Description", type: "textarea" },
  { key: "published", label: "Published", type: "boolean", default: true, showInTable: true },
];

const faqFields = [
  { key: "question", label: "Question", required: true, showInTable: true },
  { key: "question_es", label: "Question (Spanish)" },
  { key: "answer", label: "Answer", type: "textarea", required: true },
  { key: "answer_es", label: "Answer (Spanish)", type: "textarea" },
  { key: "order", label: "Sort order", type: "number", default: 1, showInTable: true },
];

const testimonialFields = [
  { key: "name", label: "Name", required: true, showInTable: true },
  { key: "location", label: "Location / Title", showInTable: true },
  { key: "rating", label: "Rating (1-5)", type: "number", default: 5, showInTable: true },
  { key: "text", label: "Testimonial", type: "textarea", required: true },
  { key: "text_es", label: "Testimonial (Spanish)", type: "textarea" },
  { key: "order", label: "Sort order", type: "number", default: 1 },
];

const areaFields = [
  { key: "name", label: "County", required: true, showInTable: true },
  { key: "cities", label: "Cities served", type: "textarea", showInTable: true },
  { key: "order", label: "Sort order", type: "number", default: 1 },
];

function StatsOverview() {
  const [stats, setStats] = useState(null);
  useEffect(() => { api.get("/admin/stats").then((r) => setStats(r.data)); }, []);
  if (!stats) return <p className="text-slate-500">Loading…</p>;
  const cards = [
    ["Total Leads", stats.leads_total], ["New Leads", stats.leads_new],
    ["Contact", stats.leads_by_type.contact], ["Referrals", stats.leads_by_type.referral], ["Campaign", stats.leads_by_type.campaign],
    ["Products", stats.products], ["Blog Posts", stats.posts], ["Resupply Subscribers", stats.subscribers],
  ];
  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-primary mb-6">Overview</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4" data-testid="admin-stats-grid">
        {cards.map(([label, value]) => (
          <div key={label} className="bg-white rounded-xl border border-slate-200 p-6">
            <p className="text-4xl font-bold text-primary mb-1">{value}</p>
            <p className="text-slate-600 font-medium">{label}</p>
          </div>
        ))}
      </div>
      <p className="text-sm text-slate-500 mt-6">GA4, call tracking, and heatmap dashboards live in their own vendor consoles once the tracking IDs are added.</p>
    </div>
  );
}

function Subscribers() {
  const [subs, setSubs] = useState([]);
  useEffect(() => { api.get("/admin/subscribers").then((r) => setSubs(r.data)); }, []);
  return (
    <div>
      <h2 className="font-serif text-2xl font-bold text-primary mb-2">Resupply Subscribers</h2>
      <p className="text-slate-600 mb-6">Opt-in, non-PHI reminder list. Automated email/SMS sending activates once Resend/Twilio keys are added.</p>
      <div className="bg-white rounded-xl border border-slate-200 overflow-x-auto">
        <table className="w-full text-left" data-testid="subscribers-table">
          <thead className="bg-secondary text-primary text-sm">
            <tr><th className="px-4 py-3 font-semibold">Name</th><th className="px-4 py-3 font-semibold">Contact</th><th className="px-4 py-3 font-semibold">Channel</th><th className="px-4 py-3 font-semibold">Category</th><th className="px-4 py-3 font-semibold">Every</th><th className="px-4 py-3 font-semibold">Joined</th></tr>
          </thead>
          <tbody>
            {subs.map((s) => (
              <tr key={s.id} className="border-t border-slate-100">
                <td className="px-4 py-3 text-slate-700">{s.name}</td>
                <td className="px-4 py-3 text-slate-700">{s.contact}</td>
                <td className="px-4 py-3 text-slate-700 uppercase text-sm">{s.channel}</td>
                <td className="px-4 py-3 text-slate-700">{s.product_category}</td>
                <td className="px-4 py-3 text-slate-700">{s.cadence} days</td>
                <td className="px-4 py-3 text-slate-500 text-sm">{new Date(s.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
            {subs.length === 0 && <tr><td colSpan={6} className="px-4 py-8 text-center text-slate-500">No subscribers yet.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "leads", label: "Lead Inbox", icon: Inbox },
  { id: "products", label: "Products", icon: Package },
  { id: "categories", label: "Categories", icon: FolderTree },
  { id: "posts", label: "Blog / Resources", icon: FileText },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
  { id: "testimonials", label: "Testimonials", icon: Star },
  { id: "service-areas", label: "Service Areas", icon: MapPin },
  { id: "subscribers", label: "Resupply List", icon: Bell },
];

export default function Admin() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState("overview");

  useEffect(() => {
    if (!loading && !user) navigate("/admin/login");
  }, [user, loading, navigate]);

  if (loading) return <div className="min-h-screen flex items-center justify-center text-slate-500">Loading…</div>;
  if (!user) return null;

  return (
    <div className="min-h-screen bg-background flex flex-col lg:flex-row" data-testid="admin-dashboard">
      <aside className="lg:w-64 bg-primary text-white flex flex-col shrink-0">
        <div className="p-5 flex items-center gap-2 border-b border-white/10">
          <HeartPulse className="w-7 h-7 text-accent" aria-hidden="true" />
          <span className="font-serif text-xl font-bold">CareFlex Admin</span>
        </div>
        <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible p-3 gap-1 flex-1" aria-label="Admin">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)} data-testid={`admin-tab-${t.id}`}
              className={`flex items-center gap-3 px-4 py-3 min-h-[44px] rounded-md text-left font-medium whitespace-nowrap transition-colors ${tab === t.id ? "bg-white/15 text-white" : "text-slate-300 hover:bg-white/10 hover:text-white"}`}>
              <t.icon className="w-5 h-5 shrink-0" aria-hidden="true" />{t.label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <p className="text-sm text-slate-300 truncate mb-3" data-testid="admin-user-email">{user.email}</p>
          <div className="flex gap-2">
            <a href="/" className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 min-h-[44px] rounded-md bg-white/10 text-sm font-semibold hover:bg-white/20 transition-colors" data-testid="admin-view-site">
              <ExternalLink className="w-4 h-4" aria-hidden="true" /> Site
            </a>
            <button onClick={async () => { await logout(); navigate("/admin/login"); }} data-testid="admin-logout-button"
              className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2.5 min-h-[44px] rounded-md bg-accent text-sm font-semibold hover:brightness-95 transition-[filter]">
              <LogOut className="w-4 h-4" aria-hidden="true" /> Logout
            </button>
          </div>
        </div>
      </aside>

      <main className="flex-1 p-6 lg:p-10 overflow-x-hidden">
        {tab === "overview" && <StatsOverview />}
        {tab === "leads" && <LeadsInbox />}
        {tab === "products" && <ResourceManager resource="products" title="Products" fields={productFields} publicEndpoint="/products" />}
        {tab === "categories" && <ResourceManager resource="categories" title="Categories" fields={categoryFields} publicEndpoint="/categories" />}
        {tab === "posts" && <ResourceManager resource="posts" title="Blog Posts" fields={postFields} publicEndpoint="/posts" adminListEndpoint="/admin/posts" />}
        {tab === "faqs" && <ResourceManager resource="faqs" title="FAQs" fields={faqFields} publicEndpoint="/faqs" />}
        {tab === "testimonials" && <ResourceManager resource="testimonials" title="Testimonials" fields={testimonialFields} publicEndpoint="/testimonials" />}
        {tab === "service-areas" && <ResourceManager resource="service-areas" title="Service Areas" fields={areaFields} publicEndpoint="/service-areas" />}
        {tab === "subscribers" && <Subscribers />}
      </main>
    </div>
  );
}
