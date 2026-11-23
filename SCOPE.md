---
# ============================================================
# SCOPE.md for Aumakua Defense. Follows web-dev/rules/SCOPE.md.template (yavin-ops).
# Prototype HTML/CSS is the visual source of truth. This file owns modes and content ownership.
# ============================================================

project: "Aumakua Defense"
slug: "aumakuadefense"
client: "Aumakua Defense (owner Josh Kaikala)"

agency: "Yavin"
agency_github_org: "Yavin-Digital"
agency_local_folder: ""        # not needed: the automated loop reads the prototype from GitHub

# Recorded decision, Mike, 2026-11-23: Node ecomm.
project_type: "ecomm"

# Recorded decision, Mike, 2026-11-23.
scaffold_repo: "app-shell-scaffold"
scaffold_version: ""           # Setup records the tag or SHA at clone time (non-blocking)

integrations:
  database: true
  auth: true                   # admin sign-in and user roles
  storage: true                # product images
  email_sendgrid: true         # contact form, order and FFL notification emails
  # Recorded decision, Mike, 2026-11-23: Stripe. Agrees with features.payments.
  payment_gateway: "stripe"
  woocommerce_api: false
  age_gate: false              # template flag is for WordPress; the 21+ gate is kept per Preserve below
  spot_prices_ticker: false
  webinar_categories: false
  google_analytics: false
  ga4_ids:
  chat_widget: false
  sms_ottertext: false

features:
  blog_mode: "none"            # the prototype has no blog page, posts or blog nav
  forms: "contact"             # contact.html: name, email, message, email-list checkbox
  auth: "credentials"          # admin sign-in plus user and role admin (users.html, user.html)
  ecommerce: "checkout"        # catalog, cart, checkout, order confirmation
  payments: "stripe"           # recorded decision, Mike, 2026-11-23
  affiliates: "on"             # admin stubs affiliates.html and applications.html; admin mirrors MedRepsRX
  qbo: "none"
  woo_sync: "none"
  campaign: "none"
  media: "shared"              # product images (ecomm uses shared media)

content_types:
  - id: "products"
    label: "Products"
    mode: "cms"
    admin: true
    public_routes:
      - "/shop.html"
      - "/product.html"
    notes: "Live the Creed medical kits with color variants, SKU and price (js/site.js array in the prototype moves to the database). Admin: admin/products.html, admin/product.html. FFL-required / serialized flag and state restrictions are fields on the product edit stub."
  - id: "categories"
    label: "Categories and filter tags"
    mode: "cms"
    admin: true
    public_routes:
      - "/category.html"
    notes: "Medical Kits category; tags Trauma Kits and Tourniquets. No admin stub of its own; managed from the products admin."
  - id: "orders"
    label: "Orders"
    mode: "cms"
    admin: true
    public_routes:
      - "/order-confirmation.html"
    notes: "Created by checkout. Admin: admin/orders.html, admin/order.html (status, tracking, notes, refunds, split shipments to home and FFL dealer)."
  - id: "users"
    label: "Users and roles"
    mode: "cms"
    admin: true
    notes: "Admin: admin/users.html, admin/user.html (Super Admin, Admin, Customer)."
  - id: "bundles"
    label: "Bundles"
    mode: "cms"
    admin: true
    notes: "Admin: admin/bundles.html."
  - id: "coupons"
    label: "Coupons"
    mode: "cms"
    admin: true
    notes: "Admin: admin/coupons.html."
  - id: "tax_rates"
    label: "Tax rates"
    mode: "cms"
    admin: true
    notes: "Per-state rates plus a fallback. Admin: admin/tax.html."
  - id: "shipping_zones"
    label: "Shipping zones and methods"
    mode: "cms"
    admin: true
    notes: "Admin: admin/shipping.html."
  - id: "state_restrictions"
    label: "State restrictions"
    mode: "cms"
    admin: true
    notes: "Admin: admin/restrictions.html (example CA/WA magazine capacity). Rows are future examples while launch sells non-serialized items only."
  - id: "ffl_dealers"
    label: "FFL dealers"
    mode: "cms"
    admin: true
    notes: "Saved and manual dealers plus zip-radius lookup. Admin: admin/ffl-dealers.html. Rows are future examples; launch sells non-serialized items only."
  - id: "ffl_review_queue"
    label: "FFL review queue"
    mode: "cms"
    admin: true
    notes: "Manual review of uploaded licenses (verify, approve or hold, contact). Admin: admin/ffl-review.html. Future; launch sells non-serialized items only."
  - id: "affiliates"
    label: "Affiliates and applications"
    mode: "cms"
    admin: true
    notes: "Admin: admin/affiliates.html, admin/applications.html (mirrors MedRepsRX)."
  - id: "email_templates"
    label: "Email templates"
    mode: "cms"
    admin: true
    notes: "Order and FFL notification templates. Admin: admin/emails.html."
  - id: "distributor_sync"
    label: "Distributor sync"
    mode: "external"
    admin: false
    notes: "Multi-distributor API sync (inventory, pricing, fulfillment) stub at admin/sync.html. Distributors are the system of record. Future; not in the launch build."
  - id: "faq_items"
    label: "FAQ"
    mode: "static"
    admin: false
    public_routes:
      - "/faq.html"
    notes: "Final client copy, used verbatim; nobody edits it as a collection after launch."

site:
  name: "Aumakua Defense"
  tagline: "Where Ancient Protection Meets Modern Precision"
  tagline_em: ""
  sub_tagline: ""
  phone: "425-345-2727"
  email: "info@aumakuadefense.com"
  address: "2501 W Behrend #E51, Phoenix, AZ 85027"
  hours: ""                    # client has not supplied hours (non-blocking)
  website: "https://aumakuadefense.com"

colors:
  primary_accent: "#C07A5A"        # measured copper
  primary_accent_dark: "#8A4E33"
  background: "#2C3324"            # military green (brand)
  background_mid: "#243024"
  background_header: "#2C3324"
  text_primary: "#F4F0E8"          # warm paper
  text_secondary: "#DF9A73"        # copper highlight
  # ink #1A1916 is the gunmetal section color. Source: css/tokens.css.

fonts:
  display: "Saira Condensed"
  body: "Barlow"
  google_fonts_url: ""             # self-hosted from /fonts, no Google Fonts request

pages:
  - path: "/index.html"
    name: "Home"
  - path: "/shop.html"
    name: "Shop"
  - path: "/category.html"
    name: "Category (?c=)"
  - path: "/product.html"
    name: "Product (?id=)"
  - path: "/cart.html"
    name: "Cart"
  - path: "/checkout.html"
    name: "Checkout"
  - path: "/order-confirmation.html"
    name: "Order confirmation"
  - path: "/about.html"
    name: "About"
  - path: "/founder.html"
    name: "Meet the Founder"
  - path: "/faq.html"
    name: "FAQ"
  - path: "/contact.html"
    name: "Contact"
  - path: "/returns.html"
    name: "Returns (forwards to shipping.html#refunds)"
  - path: "/shipping.html"
    name: "Shipping, FFL, Refund and Return"
  - path: "/safety.html"
    name: "Product Safety and Checkout Disclaimer"
  - path: "/privacy.html"
    name: "Privacy"
  - path: "/terms.html"
    name: "Terms and Conditions"
  - path: "/admin/index.html"
    name: "Admin: Admin sign in"
  - path: "/admin/dashboard.html"
    name: "Admin: Dashboard"
  - path: "/admin/orders.html"
    name: "Admin: Orders"
  - path: "/admin/order.html"
    name: "Admin: Order detail"
  - path: "/admin/products.html"
    name: "Admin: Products"
  - path: "/admin/product.html"
    name: "Admin: Product edit"
  - path: "/admin/users.html"
    name: "Admin: Users"
  - path: "/admin/user.html"
    name: "Admin: User detail"
  - path: "/admin/affiliates.html"
    name: "Admin: Affiliates"
  - path: "/admin/applications.html"
    name: "Admin: Affiliate applications"
  - path: "/admin/bundles.html"
    name: "Admin: Bundles"
  - path: "/admin/coupons.html"
    name: "Admin: Coupons"
  - path: "/admin/tax.html"
    name: "Admin: Tax rates"
  - path: "/admin/shipping.html"
    name: "Admin: Shipping zones and methods"
  - path: "/admin/sync.html"
    name: "Admin: Distributor sync"
  - path: "/admin/emails.html"
    name: "Admin: Email templates"
  - path: "/admin/settings.html"
    name: "Admin: Settings and diagnostics"
  - path: "/admin/ffl-dealers.html"
    name: "Admin: FFL dealers"
  - path: "/admin/ffl-review.html"
    name: "Admin: FFL review queue"
  - path: "/admin/restrictions.html"
    name: "Admin: State restrictions"

deployment:
  platform: "digital-ocean-app-platform"
  region: ""                   # Rath/DevOps at setup, from the DB cluster (non-blocking)
  plan: "basic"
  spaces_bucket: "yavin-media"
  spaces_folder: "aumakuadefense"
  domain: "aumakuadefense.com"
  do_team: ""                  # Rath/DevOps at setup (non-blocking)

repo:
  github_org: "Yavin-Digital"
  prototype_repo: "aumakuadefense-prototype"
  app_repo: "aumakuadefense-app"
  default_branch: "main"

prototype:
  review_url: "https://aumakuadefense.clientreview.co"
  github_repo: "Yavin-Digital/aumakuadefense-prototype"
  location: ""
  guide: "PROJECT_GUIDE.md"
---

# Aumakua Defense: Project Scope

## Overview

Aumakua Defense is a Node ecommerce site (project type `ecomm`, scaffold `app-shell-scaffold`, `@yavin/feature-ecomm-core`, `@yavin/feature-payments` with Stripe). The owner is Josh Kaikala, Founder. The site sells Live the Creed medical kits (EDC Pocket Trauma Kit, Responder IFAK, Direct Action Tourniquet Kit) from the client's product list. The admin mirrors the MedRepsRX backend (`Yavin-Digital/MedRepsRX`, `app/(admin)/admin/*`) because Aumakua will use the same backend.

- Prototype repo: `Yavin-Digital/aumakuadefense-prototype`. Review URL: `https://aumakuadefense.clientreview.co`.
- Live site: `https://aumakuadefense.com` (GoDaddy Website Builder coming-soon page, checked 2026-10-13).
- House credit: The Tribe Maker (`https://thetribemaker.com`).
- Stripe was chosen by Mike on 2026-11-23. The prototype calls no gateway and does not load Stripe.js; the site stops at payment and fulfillment is outside it.

| Field | Value |
|---|---|
| Name | Aumakua Defense |
| Tagline | Where Ancient Protection Meets Modern Precision |
| Phone | 425-345-2727 |
| Email | info@aumakuadefense.com (FFL licenses: ffl@aumakuadefense.com) |
| Address | 2501 W Behrend #E51, Phoenix, AZ 85027 |
| Hours | |
| Owner | Josh Kaikala, Founder |

## Catalog and storefront

Three products in one category (Medical Kits) with filter tags Trauma Kits and Tourniquets. Each product has color variants, SKUs and a listed price (MAP). Cart lines are `id`, `productId`, `variantId`, `qty`. Checkout shows a sample order and stores no card fields. `?resetage=1` clears the age gate in the prototype.

History: on 2026-10-23 Mike replaced the four live-store slugs with four generic example items (Plate Carrier, OWB/IWB Holster, Rifle Scope, Tactical Flashlight). Those were later replaced by the client's Live the Creed products and photos (prototype PR #8). Launch sells non-serialized accessories only.

## Home section order and motion (2026-10-23)

Home order: hero, weave divider, Built for, Shop (catalog), Featured spotlight, brand story, gear-up CTA. Product-card tilt max 2.5deg (Y) / 2deg (X) with eased smoothing; hero parallax about half the original strength; all motion off under prefers-reduced-motion; embers kept.

## Admin

Static admin pages at `/admin/` (sign-in at `admin/index.html`), sample data only, noindex and disallowed in robots. Structure mirrors the MedRepsRX admin. Aumakua additions, each marked in the UI: FFL required / serialized product flag, split shipments (home + FFL dealer), FFL dealer lookup and manual review queue, state restrictions, multi-distributor API sync. Launch sells non-serialized accessories only; FFL rows are future examples. Page-to-feature map: `PROJECT_GUIDE.md`.

## Client copy (2026-10-26)

Mike supplied final client copy, used verbatim: About, Meet the Founder (`founder.html`), Privacy, Terms, Shipping/FFL + Refund & Return (`shipping.html`; `returns.html` forwards to `shipping.html#refunds`), Product Safety & Checkout Disclaimer (`safety.html`), FAQ (`faq.html`). Effective/Last Updated 11/01/2026. Checkout has an unchecked required agreement checkbox (stub). No founder photo supplied; the mark stands in.

## Preserve / Don't invent

Preserve:
- The 21+ age gate on every page (simulated in the prototype; copy "You must be 21 or older to enter this site."). Real verification method is not decided.
- Client copy used verbatim (About, Founder, Privacy, Terms, Shipping/FFL, Refund & Return, Safety, FAQ), including the FAQ "($50 average)".
- NAP, owner Josh Kaikala, tagline, and the separate FFL email.
- Home section order and motion rules above.
- Admin structure mirrors MedRepsRX, with the Aumakua additions.
- Real Live the Creed product names, SKUs and prices. No invented products.
- "Website by The Tribe Maker" credit.
- Launch sells non-serialized accessories only.

Don't invent:
- A blog, news, customer accounts or wishlists, reviews or testimonials, or any page not in `pages`.
- Hours, a founder photo, stats, or legality or shipping claims beyond the client copy.
- Firearms, receivers, suppressors, ammo or magazines in the catalog.
- QuickBooks, Woo sync, campaign pages, or other payment gateways.
- Any prototype or review wording in the live build.

## Open Questions

All items below are non-blocking for Phase 3: none changes a page, a mode, an integration or a content type.

- Non-blocking: business hours (client has not supplied them; the field stays blank).
- Non-blocking: whether firearms or regulated parts will be sold later. Launch is non-serialized accessories only; FFL dealer, FFL review and state-restriction rows stay future examples.
- Non-blocking: which distributors, if any, get API sync later (`distributor_sync` is external and not in the launch build).
- Non-blocking: whether Aumakua will actually run an affiliate program. The admin stubs exist because the admin mirrors MedRepsRX; `features.affiliates: on` follows that decision.
- Non-blocking: real age verification method for the 21+ gate.
- Non-blocking: where contact-form submissions and email-list sign-ups are delivered.
- Non-blocking: phone has a 425 (WA) area code with a Phoenix address; client to confirm.
- Non-blocking: legal copy covers firearms/ammo sales while launch catalog is non-FFL.
- Non-blocking: DO region and team, and the scaffold tag, are set by Rath/setup.

## Out of Scope

- Blog.
- QuickBooks, Woo sync, campaign pages.
- Live distributor API sync, FFL dealer lookup and manual FFL review automation (future).
- Fulfillment (the site stops at payment).
- Real age verification (until the method is decided).
- Any payment gateway other than Stripe.

## Notes for the coding agent

- Build on `app-shell-scaffold` with `@yavin/feature-ecomm-core` and `@yavin/feature-payments` (`features.payments: stripe`), `@yavin/feature-forms`, `@yavin/feature-auth-admin` and `@yavin/feature-media`, each pinned to the newest exact tag. Do not use the deprecated `ecomm-scaffold`.
- Products, categories and every `cms` content type read from the database. Do not ship them from `js/site.js` or HTML.
- Admin pages in the prototype are visual only; build CRUD per `content_types`.
- Prototype lives in GitHub and at the review URL. Do not copy it into the app repo.
- `.md` files must not be served by the production site.
- Page-to-feature map of the admin: `PROJECT_GUIDE.md`.
