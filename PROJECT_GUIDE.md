# Aumakua Defense project guide

Phase 1 HTML prototype. Design source of truth for a later build on `app-shell-scaffold` and `@yavin/feature-ecomm-core`. Payments adapter is not chosen. Do not use the deprecated `ecomm-scaffold`.

## Run

```bash
python3 -m http.server 8765
```

Open `http://127.0.0.1:8765/`. Review host after publish from `main`: `https://aumakuadefense.clientreview.co`.

`?resetage=1` clears the simulated age gate.

## Stack

Hand-written HTML, CSS, and JavaScript. No framework and no build step.

| File | Role |
|---|---|
| `js/site.js` | Products, category, tags, NAP |
| `js/cart.js` | `localStorage` cart lines: `id`, `productId`, `variantId`, `qty` |
| `js/layout.js` | Banner, header, footer, age gate |
| `js/store.js` | Shop, category, product, cart, checkout, contact form |
| `css/tokens.css` | Colors and type from `brand.html` |
| `brand.html` | Brand standards |
| `assets/AumakuaDefense-Brand-Standards.pdf` | Letter PDF of the brand guide |
| `AumakuaDefense-Presentation.html` | 9-slide deck |

Catalog shape lines up with a later ecomm core: product, variant, category, cart line, order summary. `price` is `null` on every variant. Checkout stores a sample order in `sessionStorage` and does not store card fields.

## Pages

| Page | File |
|---|---|
| Home | `index.html` |
| Shop | `shop.html` |
| Category | `category.html?c=` |
| Product | `product.html?id=` |
| Cart | `cart.html` |
| Checkout | `checkout.html` |
| Sample confirmation | `order-confirmation.html` |
| About | `about.html` |
| Contact | `contact.html` |
| Meet the Founder | `founder.html` |
| FAQ | `faq.html` |
| Shipping/FFL + Refund & Return | `shipping.html` (`returns.html` forwards) |
| Product Safety & Checkout Disclaimer | `safety.html` |
| Privacy, terms | matching HTML files |
| Brand | `brand.html` |
| Performance | `performance.html` |
| Deck | `AumakuaDefense-Presentation.html` |
| SEO / AEO compare | `compare/AumakuaDefense-SEO-AEO-Compare.html` (facts file not edited) |

Live KEEP urls map as: `/` → home, `/ols/products` → shop. The old live product slugs no longer map one-to-one: since 2026-10-23 the catalog holds four example items (`plate-carrier`, `owb-iwb-holster`, `rifle-scope`, `tactical-flashlight`), filter tags Optics, Holsters, Carriers, Lights. Example prices live in `priceLabel` only.

## Age gate

Full-screen dialog from `js/layout.js` until `localStorage.ad_age_ok` is `1`. Copy: “You must be 21 or older to enter this site.” Buttons: “I am 21 or older” and “I am under 21.” Escape does not close it. Focus stays in the dialog. Under 21 shows an exit message and does not set the flag. A note reads “Prototype — simulated age verification.”

## Changelog

| Date | Change |
|---|---|
| 2026-10-13 | Prototype build: brand guide and Letter PDF, storefront, simulated cart and checkout, age gate, deck, scope stub. |

## Admin prototype (`/admin/`)

Static HTML, shared styles in `admin/admin.css` on top of `css/tokens.css`. Sample data only. Desktop sidebar from 1024px; Menu button below. Built from MedRepsRX (`app/(admin)/admin/layout.tsx` nav, `prisma/schema.prisma` models).

| MedRepsRX admin feature | Aumakua admin page |
|---|---|
| /login + ADMIN_ACCESS capability (Super Admin, Admin, Customer) | `admin/index.html` sign-in (visual only) |
| Dashboard (revenue, orders, products, customers, 30-day chart, recent orders, sync status) | `admin/dashboard.html` |
| Orders + OrdersToolbar (search, status, date, export) | `admin/orders.html` |
| Order detail (items, totals, OrderEvent history, notes, status/tracking actions, full/partial refund) | `admin/order.html` |
| Products (ProductsTable, status/stock filters, overrides) | `admin/products.html`, `admin/product.html` |
| Users + user detail (roles, notes, resend invite, convert to affiliate) | `admin/users.html`, `admin/user.html` |
| Affiliates, Applications | `admin/affiliates.html`, `admin/applications.html` (confirm Aumakua needs them) |
| Bundles | `admin/bundles.html` |
| Coupons | `admin/coupons.html` |
| Tax Rates (per state + fallback) | `admin/tax.html` |
| Shipping zones + methods | `admin/shipping.html` |
| Sync (Medi-Mate catalog, SyncLog) | `admin/sync.html` (per-distributor) |
| Emails (template previews) | `admin/emails.html` |
| Settings & Diagnostics (store, gateway mode, code mode) | `admin/settings.html` |

| Aumakua-only addition | Where |
|---|---|
| FFL required / serialized flag | product edit, products filter |
| Split shipments (home + FFL dealer) | order detail, orders filter, shipping |
| FFL dealer lookup (zip radius) + saved/manual dealers | `admin/ffl-dealers.html` |
| Manual FFL review queue (upload, verify, approve/hold, contact) | `admin/ffl-review.html` |
| State restrictions (e.g. CA/WA magazine capacity) | `admin/restrictions.html`, product edit |
| Multi-distributor API sync (inventory, pricing, fulfillment; Example names) | `admin/sync.html`, product edit |
| Age gate 18+/21+ setting, FFL notification templates | `admin/settings.html`, `admin/emails.html` |
