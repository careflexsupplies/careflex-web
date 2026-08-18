# CareFlex Content Editor Guide

Everything you see on the website — products, prices, blog posts, FAQs, testimonials, service areas — lives in **one file**:

```
frontend/src/data/content.js
```

Open it in any text editor. Edit the text between the quotes. Save. Rebuild (see bottom). That's it.

---

## 1. Editing Products

Find `export const PRODUCTS = [ ... ]`. Each product looks like this:

```js
{
 "slug": "quad-cane",                  // the web address: /product/quad-cane (lowercase, dashes, must be unique)
 "name": "Quad Cane with Offset Handle",
 "category_slug": "mobility-aids",     // one of: mobility-aids, orthotics, diabetes-care, wound-care
 "coverage": "cash",                   // "insurance" = green covered badge, "cash" = cash-pay badge + Add to Cart
 "price": 34.99,                       // number, only used when coverage is "cash". Use null for insurance items
 "image": "https://...",               // full link to a product photo
 "featured": false,                    // true = can appear in homepage highlights
 "in_stock": true,                     // false shows "out of stock — call for availability"
 "description": "Four-point base cane for extra stability...",
 "features": ["Stands on its own", "Ergonomic offset handle"]   // bullet points, each in quotes, comma-separated
}
```

### Change a price
Find the product by name → change `"price": 34.99` to the new number (no $ sign). Done.

### Add a new product
Copy an entire product block from `{` to `}`, paste it before the closing `];`, add a comma after the previous block, then change slug, name, price, image and text. **The slug must be unique.**

### Remove a product
Delete its whole block from `{` to `}` (including the comma that follows it).

### Make an item purchasable in the cart
Set `"coverage": "cash"` and give it a `"price"`. The Add-to-Cart button appears automatically.

---

## 2. Editing Blog Posts

Find `export const POSTS = [ ... ]`. Key fields:

- `"slug"` — web address: /blog/your-slug
- `"title"`, `"category"`, `"author"`, `"image"`, `"excerpt"` — the card on the Resources page
- `"content"` — the article body. Formatting inside content:
  - `## Heading text` at the start of a line = section heading
  - `- item` = bullet point, `1. item` = numbered step
  - `**bold text**` = bold
  - `\n\n` = new paragraph (keep the content on one line; use \n for line breaks)
- `"seo_title"`, `"seo_description"` — what Google shows
- `"published": true` — set to false to hide a post

To add a post: copy an existing post block, paste, change slug + text.

---

## 3. Editing FAQs, Testimonials, Service Areas, Categories

Same pattern — each is a list of blocks:

- **FAQS**: `question` / `answer` (plus `question_es` / `answer_es` for Spanish). `order` controls position.
- **TESTIMONIALS**: `name`, `location`, `rating` (1–5 stars), `text` (+ `text_es`).
- **SERVICE_AREAS**: `name` (county), `cities` (comma-separated text), `order`.
- **CATEGORIES**: display `name`, `description`, `image` per category. Don't change the `slug`s — products point to them.

Spanish: any field ending in `_es` is the Spanish version shown when visitors tap "Español". If you leave it out, English is shown.

---

## 4. Phone numbers, email, promo code, socials

These live in `frontend/src/lib/api.js` (top of the file):

```js
export const PHONE = "(346) 621-1342";        // Call Now number
export const MAIN_PHONE = "(346) 646-3386";   // main office number
export const FAX = "(346) 601-3640";
export const EMAIL = "contact@careflexsupplies.com";
export const PROMO_CODE = "CARE10";           // cart promo code
export const PROMO_DISCOUNT = 0.10;           // 0.10 = 10% off
export const SOCIALS = { facebook: "...", instagram: "...", linkedin: "..." };
export const FORM_EMAIL = "contact@careflexsupplies.com";  // where ALL form submissions are emailed
```

If you change a phone number, also update the matching `tel:` line right below it (digits only, e.g. `tel:+13466211342`).

---

## 5. Golden rules (avoid breaking the file)

1. Text always goes **between double quotes** `"like this"`.
2. Every block and every field ends with a **comma**, except the last one in a list.
3. Don't delete the `{ } [ ]` brackets or the `export const NAME =` lines.
4. If a quote appears inside your text, write it as `\"` (e.g. `"18\" seat width"`).
5. When in doubt, copy an existing block and edit it rather than typing from scratch.

---

## 6. Publishing your changes (rebuild)

The live site is built from these files. After editing:

```bash
cd frontend
yarn build
```

Then upload the contents of the `frontend/build` folder to your host (or re-download the zip if you ask the Emergent agent to rebuild it for you). Editing `content.js` alone does not change the already-built zip — a rebuild is always required.
