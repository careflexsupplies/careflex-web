# CareFlex — PRD & Build Memory

## Original Problem Statement
Fast, HIPAA-aware, conversion-optimized website for CareFlex (accredited DME supplier) to generate patient leads, calls, and provider referrals, with product catalog and admin dashboard. Phone +1 346-636-0201 #800, fax (713) 800-5088 site-wide. Bilingual EN/ES. PHI handled only via Jotform HIPAA embed (placeholder for now).

## User Choices (June 2026)
- Placeholder 3rd-party embeds (Jotform, GA4, CallRail, Clarity, Tawk) — swap later
- Emergent-managed Google social login for admin
- Resupply reminders: opt-in list only, sending mocked (no Resend/Twilio keys)
- ~20 seeded products across 4 categories
- Full Phase 1 scope in first delivery

## Architecture
- FastAPI + MongoDB (`test_database`), all routes under /api
- Collections: categories, products, posts, faqs, testimonials, service_areas, leads, subscribers, users, user_sessions
- Generic admin CRUD: /api/admin/{resource} (products, categories, posts, faqs, testimonials, service-areas), auth-gated via session cookie/Bearer
- Auth: Emergent Google OAuth (playbook pattern), 7-day sessions, httpOnly cookie; every Google user gets role "admin" (no allowlist yet)
- Startup seed (idempotent) in server.py from seed_data.py
- React (JS) + Tailwind + shadcn; i18n via LangProvider context (EN/ES dict + per-field _es picks); design tokens: primary #1D3557, accent #E07A5F, Lora/Work Sans

## Implemented (June 2026 — MVP complete, tested 100%)
- Public: Home (hero, category tiles, how-it-works, featured, testimonials, CTA band), Products hub + category pages + filters/search + coverage badges, Product detail, Insurance, Intake (Jotform placeholder — set JOTFORM_URL in Intake.jsx), Providers (referral form + e-fax), About, Contact (map + non-PHI form), Campaign landing /get-equipment (3-step form + thank-you), Blog + article pages, FAQ (with FAQ JSON-LD schema), Service Area, EN/ES toggle, footer w/ NAP + mini contact form, chat widget placeholder, sticky header w/ click-to-call
- Admin (/admin): Google login, Overview stats, Lead inbox (filter + status), CRUD for products/categories/posts/faqs/testimonials/service-areas, resupply subscriber list
- SEO: MedicalBusiness JSON-LD + meta/OG in index.html, robots.txt, sitemap.xml, per-page titles/descriptions
- Analytics hooks: trackEvent() (gtag/posthog) on calls, CTAs, form submits; GA4/CallRail/Clarity/Tawk commented placeholders in public/index.html

## Backlog (prioritized)
- P0: Real Jotform HIPAA URL, real tracking IDs (GA4, CallRail, Clarity, Tawk), brand assets (logo, address, hours), admin email allowlist for access control
- P1: Resupply reminder actual sending (Resend + Twilio) + admin scheduler, email notifications to staff on new leads, image upload for products (object storage)
- P2: A/B variant B for landing page, review schema per product, CSV product import, blog categories/related-posts logic, accessibility audit pass (WCAG 2.1 AA formal), Spanish translations for product/blog content

## Notes
- NEVER hardcode auth redirect URLs (window.location.origin only)
- Test auth via /app/auth_testing.md (mongo-injected sessions); creds notes in /app/memory/test_credentials.md
- Product images are stock placeholders; some are loosely matched — swap when brand assets arrive
