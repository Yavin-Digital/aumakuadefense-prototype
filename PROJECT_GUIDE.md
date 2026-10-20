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
| Shipping, returns, privacy, terms | matching HTML files |
| Brand | `brand.html` |
| Performance | `performance.html` |
| Deck | `AumakuaDefense-Presentation.html` |
| SEO / AEO compare | `compare/AumakuaDefense-SEO-AEO-Compare.html` (facts file not edited) |

Live KEEP urls map as: `/` → home, `/ols/products` → shop, each `/ols/products/{slug}` → `product.html?id={slug}`.

## Age gate

Full-screen dialog from `js/layout.js` until `localStorage.ad_age_ok` is `1`. Copy: “You must be 21 or older to enter this site.” Buttons: “I am 21 or older” and “I am under 21.” Escape does not close it. Focus stays in the dialog. Under 21 shows an exit message and does not set the flag. A note reads “Prototype — simulated age verification.”

## Changelog

| Date | Change |
|---|---|
| 2026-10-13 | Prototype build: brand guide and Letter PDF, storefront, simulated cart and checkout, age gate, deck, scope stub. |
