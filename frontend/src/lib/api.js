import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API, withCredentials: true });

export const PHONE = "+1 346-636-0201 #800";
export const PHONE_HREF = "tel:+13466360201,800";
export const FAX = "(713) 800-5088";
export const EMAIL = "care@careflex.com";
export const PROMO_CODE = "CARE10";
export const PROMO_DISCOUNT = 0.10;
export const SOCIALS = {
  facebook: "https://facebook.com/careflex",
  instagram: "https://instagram.com/careflex",
  linkedin: "https://linkedin.com/company/careflex",
};
export const HQAA_SEAL = "https://customer-assets-m6fa6gv7.emergentagent.net/job_flex-health-lead/artifacts/iidhinwy_HQAA_Seal_4C.jpg";

export function trackEvent(name, params = {}) {
  if (window.gtag) window.gtag("event", name, params);
  if (window.posthog) window.posthog.capture(name, params);
}
