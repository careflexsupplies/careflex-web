import { MapPin, Truck } from "lucide-react";
import Layout, { CallButton } from "@/components/Layout";
import { usePageMeta } from "@/components/Shared";
import { SERVICE_AREAS } from "@/data/content";
import { useLang } from "@/i18n";

export default function ServiceArea() {
  const { t } = useLang();
  const areas = SERVICE_AREAS;
  usePageMeta("Delivery & Service Area", "CareFlex delivers medical equipment across 8 Greater Houston counties — free delivery and setup included.");

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary tracking-tight mb-3" data-testid="service-area-title">{t("service_title")}</h1>
        <p className="text-lg text-slate-600 mb-12 max-w-2xl">{t("service_sub")}</p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16" data-testid="service-area-grid">
          {areas.map((a) => (
            <div key={a.id} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
              <MapPin className="w-7 h-7 text-accent mb-3" aria-hidden="true" />
              <h2 className="font-serif text-xl font-semibold text-primary mb-2">{a.name}</h2>
              <p className="text-slate-600 leading-relaxed">{a.cities}</p>
            </div>
          ))}
        </div>

        <div className="bg-primary rounded-2xl p-10 lg:p-14 text-white flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
          <div className="flex items-start gap-4">
            <Truck className="w-10 h-10 text-accent shrink-0" aria-hidden="true" />
            <div>
              <h2 className="font-serif text-2xl font-bold mb-2">Outside these areas?</h2>
              <p className="text-slate-300 text-lg leading-relaxed">We regularly add new delivery zones. Call us — we may still be able to serve you or ship supplies directly.</p>
            </div>
          </div>
          <CallButton size="lg" />
        </div>
      </div>
    </Layout>
  );
}
