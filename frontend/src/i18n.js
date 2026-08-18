import { createContext, useContext, useState } from "react";

const dict = {
  en: {
    nav_home: "Home", nav_products: "Products", nav_insurance: "Insurance", nav_providers: "For Providers",
    nav_resources: "Resources", nav_faq: "FAQ", nav_about: "About", nav_contact: "Contact",
    call_now: "Call Now", get_started: "Get Started",
    hero_title: "The medical equipment you need, covered and delivered.",
    hero_sub: "CareFlex is an accredited DME supplier. We verify your Medicare or insurance benefits, handle every form, and deliver to your door — usually within days.",
    hero_cta1: "Get Started", hero_cta2: "Call Now",
    badge_accredited: "DME Accredited", badge_medicare: "Medicare Accepted", badge_hipaa: "HIPAA-Secure",
    browse_categories: "Browse by category", how_title: "How it works", how_sub: "Three simple steps. We do the hard part.",
    how_1t: "Tell us what you need", how_1d: "Complete our secure form or call us. Have your insurance card and doctor's info handy.",
    how_2t: "We handle the paperwork", how_2d: "We verify benefits, contact your doctor for the prescription, and get approvals.",
    how_3t: "Delivered to your door", how_3d: "Your equipment arrives in 2–5 business days, with setup help if needed.",
    testimonials_title: "Trusted by patients and providers",
    featured_title: "Featured equipment", view_all: "View all products",
    covered_badge: "Medicare/Insurance Covered", cash_badge: "Cash-Pay",
    check_eligibility: "Check Eligibility", search_placeholder: "Search products...",
    filter_all: "All", filter_covered: "Insurance Covered", filter_cash: "Cash-Pay",
    footer_hours: "Office: Tue–Thu 8:00 AM – 6:00 PM", contact_hours: "Phone & Contact: Mon–Fri 8:00 AM – 6:00 PM", footer_tag: "Accredited durable medical equipment supplier serving Greater Houston.",
    quick_message: "Send a quick message", your_name: "Your name", your_email: "Your email",
    message: "Message (no medical details, please)", send: "Send Message", thanks: "Thank you! We'll reply within one business day.",
    resupply_title: "Never run out of supplies", resupply_sub: "Free email or text reminders when you're due for a resupply. Non-medical, unsubscribe anytime.",
    resupply_cta: "Set up reminders", phone_or_email: "Email or phone number", cadence: "Remind me every",
    days_30: "30 days", days_60: "60 days", days_90: "90 days", channel_email: "Email", channel_sms: "Text (SMS)",
    resupply_done: "You're on the list! We'll remind you when it's time.",
    products_title: "Medical Equipment Catalog", products_sub: "Every item marked with its coverage type. Insurance-covered items require a doctor's prescription — we help you get it.",
    no_products: "No products match your search.",
    faq_title: "Frequently Asked Questions", blog_title: "Resources & Guides",
    service_title: "Delivery & Service Area", service_sub: "Free delivery across the Greater Houston region. Counties and cities we serve:",
    lang_toggle: "Español",
    same_day: "Same Day Shipping", contact_us: "Contact Us", shop_all: "Shop All Departments",
    new_patient_form: "New Patient Form", accept_banner: "We accept Medicare & Commercial PPO",
    promo_banner: "Cash purchases: use code CARE10 for 10% off", cart: "Cart",
    tagline: "Care that moves with you",
  },
  es: {
    nav_home: "Inicio", nav_products: "Productos", nav_insurance: "Seguro", nav_providers: "Para Proveedores",
    nav_resources: "Recursos", nav_faq: "Preguntas", nav_about: "Nosotros", nav_contact: "Contacto",
    call_now: "Llame Ahora", get_started: "Comenzar",
    hero_title: "El equipo médico que necesita, cubierto y entregado.",
    hero_sub: "CareFlex es un proveedor acreditado de equipo médico. Verificamos sus beneficios de Medicare o seguro, manejamos cada formulario y entregamos en su puerta.",
    hero_cta1: "Comenzar", hero_cta2: "Llame Ahora",
    badge_accredited: "Acreditación DME", badge_medicare: "Acepta Medicare", badge_hipaa: "Seguro HIPAA",
    browse_categories: "Explorar por categoría", how_title: "Cómo funciona", how_sub: "Tres pasos simples. Nosotros hacemos la parte difícil.",
    how_1t: "Díganos qué necesita", how_1d: "Complete nuestro formulario seguro o llámenos. Tenga a mano su tarjeta de seguro.",
    how_2t: "Nos encargamos del papeleo", how_2d: "Verificamos beneficios, contactamos a su médico y obtenemos aprobaciones.",
    how_3t: "Entregado en su puerta", how_3d: "Su equipo llega en 2 a 5 días hábiles, con ayuda de instalación.",
    testimonials_title: "La confianza de pacientes y proveedores",
    featured_title: "Equipo destacado", view_all: "Ver todos los productos",
    covered_badge: "Cubierto por Medicare/Seguro", cash_badge: "Pago Directo",
    check_eligibility: "Verificar Elegibilidad", search_placeholder: "Buscar productos...",
    filter_all: "Todos", filter_covered: "Cubierto por Seguro", filter_cash: "Pago Directo",
    footer_hours: "Oficina: Mar–Jue 8:00 AM – 6:00 PM", contact_hours: "Teléfono y Contacto: Lun–Vie 8:00 AM – 6:00 PM", footer_tag: "Proveedor acreditado de equipo médico duradero para el área de Houston.",
    quick_message: "Envíe un mensaje rápido", your_name: "Su nombre", your_email: "Su correo",
    message: "Mensaje (sin detalles médicos, por favor)", send: "Enviar Mensaje", thanks: "¡Gracias! Le responderemos en un día hábil.",
    resupply_title: "Nunca se quede sin suministros", resupply_sub: "Recordatorios gratuitos por correo o texto cuando le toque reabastecerse. Cancele en cualquier momento.",
    resupply_cta: "Configurar recordatorios", phone_or_email: "Correo o número de teléfono", cadence: "Recordarme cada",
    days_30: "30 días", days_60: "60 días", days_90: "90 días", channel_email: "Correo", channel_sms: "Texto (SMS)",
    resupply_done: "¡Está en la lista! Le recordaremos cuando sea el momento.",
    products_title: "Catálogo de Equipo Médico", products_sub: "Cada artículo marcado con su tipo de cobertura. Los artículos cubiertos requieren receta médica — le ayudamos a obtenerla.",
    no_products: "Ningún producto coincide con su búsqueda.",
    faq_title: "Preguntas Frecuentes", blog_title: "Recursos y Guías",
    service_title: "Entrega y Área de Servicio", service_sub: "Entrega gratuita en toda el área metropolitana de Houston. Condados y ciudades que servimos:",
    lang_toggle: "English",
    same_day: "Envío el Mismo Día", contact_us: "Contáctenos", shop_all: "Todos los Departamentos",
    new_patient_form: "Formulario de Paciente Nuevo", accept_banner: "Aceptamos Medicare y PPO Comercial",
    promo_banner: "Compras directas: use el código CARE10 para 10% de descuento", cart: "Carrito",
    tagline: "Cuidado que se mueve contigo",
  },
};

const LangContext = createContext();

export function LangProvider({ children }) {
  const [lang, setLang] = useState(localStorage.getItem("cf_lang") || "en");
  const toggle = () => {
    const next = lang === "en" ? "es" : "en";
    setLang(next);
    localStorage.setItem("cf_lang", next);
  };
  const t = (key) => dict[lang][key] || dict.en[key] || key;
  const pick = (item, field) => (lang === "es" && item?.[`${field}_es`]) || item?.[field] || "";
  return <LangContext.Provider value={{ lang, toggle, t, pick }}>{children}</LangContext.Provider>;
}

export const useLang = () => useContext(LangContext);
