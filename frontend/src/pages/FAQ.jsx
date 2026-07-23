import { useState, useEffect } from "react";
import Layout, { CallButton } from "@/components/Layout";
import { usePageMeta } from "@/components/Shared";
import { api } from "@/lib/api";
import { useLang } from "@/i18n";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export default function FAQ() {
  const { t, pick } = useLang();
  const [faqs, setFaqs] = useState([]);
  usePageMeta("FAQ", "Answers to common questions about Medicare DME coverage, delivery, resupply reminders, and more.");

  useEffect(() => {
    api.get("/faqs").then((r) => {
      setFaqs(r.data);
      const schema = {
        "@context": "https://schema.org", "@type": "FAQPage",
        mainEntity: r.data.map((f) => ({ "@type": "Question", name: f.question, acceptedAnswer: { "@type": "Answer", text: f.answer } })),
      };
      let el = document.getElementById("faq-schema");
      if (!el) {
        el = document.createElement("script");
        el.type = "application/ld+json";
        el.id = "faq-schema";
        document.head.appendChild(el);
      }
      el.textContent = JSON.stringify(schema);
    });
    return () => document.getElementById("faq-schema")?.remove();
  }, []);

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-14 lg:py-20">
        <h1 className="font-serif text-4xl sm:text-5xl font-bold text-primary tracking-tight mb-3" data-testid="faq-title">{t("faq_title")}</h1>
        <p className="text-lg text-slate-600 mb-12">Straight answers about coverage, delivery, and how we work.</p>
        <Accordion type="single" collapsible className="space-y-4" data-testid="faq-accordion">
          {faqs.map((f) => (
            <AccordionItem key={f.id} value={f.id} className="bg-white rounded-xl border border-slate-200 px-6 shadow-sm">
              <AccordionTrigger className="text-left text-lg font-semibold text-primary py-5 hover:no-underline" data-testid={`faq-question-${f.order}`}>
                {pick(f, "question")}
              </AccordionTrigger>
              <AccordionContent className="text-base text-slate-600 leading-relaxed pb-5">
                {pick(f, "answer")}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
        <div className="mt-12 bg-secondary rounded-2xl p-8 text-center">
          <p className="font-serif text-xl font-bold text-primary mb-4">Didn't find your answer?</p>
          <CallButton size="lg" />
        </div>
      </div>
    </Layout>
  );
}
