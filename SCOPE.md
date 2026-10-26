# Aumakua Defense — scope stub

```yaml
project_type: TBD — deferred to real build (ecomm or wordpress)
features:
  ecommerce: checkout
  payments: TBD
```

Prototype repo: `Yavin-Digital/aumakuadefense-prototype`.
Review URL (after publish from `main`): `https://aumakuadefense.clientreview.co`.
Live site: `https://aumakuadefense.com` (GoDaddy Website Builder coming-soon page, checked 2026-10-13).
House credit on the prototype: The Tribe Maker (`https://thetribemaker.com`).

Payments (`authnet`, `stripe`, or both) are an open question. This prototype does not call a gateway and does not load Stripe.js.

The four live-store product slugs were replaced on 2026-10-23 (Mike, per Josh's launch plan of non-serialized accessories only) with four generic example items that need no FFL: Plate Carrier, OWB/IWB Holster, Rifle Scope, Tactical Flashlight. No brands, no firearms, receivers, suppressors, ammo, or magazines. Each is labeled Example with an example price ($149, $59, $249, $79); variant `price` stays null so cart totals stay blank. Whether firearms or regulated parts will be sold is unconfirmed. The prototype makes no FFL, shipping, or legality claim. A simulated 21+ gate is on every page for the firearms-site house rule.

Unknowns stay blank on purpose.

| Field | Value |
|---|---|
| Name | Aumakua Defense |
| Tagline | Where Ancient Protection Meets Modern Precision |
| Phone | 425-345-2727 |
| Email | info@aumakuadefense.com (FFL licenses: ffl@aumakuadefense.com) |
| Address | 2501 W Behrend #E51, Phoenix, AZ 85027 |
| Hours | |
| Owner | Josh Kaikala, Founder |

## Home section order and motion (2026-10-23)

Home order: hero, weave divider, Built for, Shop (catalog), Featured spotlight, brand story, gear-up CTA. Product-card tilt max 2.5deg (Y) / 2deg (X) with eased smoothing; hero parallax about half the original strength; all motion off under prefers-reduced-motion; embers kept.

## Admin (prototype)

Static admin pages at `/admin/` (sign-in at `admin/index.html`), sample data only, noindex and disallowed in robots. Structure mirrors the MedRepsRX admin (`Yavin-Digital/MedRepsRX`, `app/(admin)/admin/*`) because Aumakua will use the same backend. Aumakua additions, each marked in the UI: FFL required / serialized product flag, split shipments (home + FFL dealer), FFL dealer lookup and manual review queue, state restrictions, multi-distributor API sync. Launch sells non-serialized accessories only; FFL rows are future examples. The site stops at payment; fulfillment is outside it.

## Client copy (2026-10-26)

Mike supplied final client copy, used verbatim: About, Meet the Founder (`founder.html`), Privacy, Terms, Shipping/FFL + Refund & Return (`shipping.html`; `returns.html` forwards to `shipping.html#refunds`), Product Safety & Checkout Disclaimer (`safety.html`), FAQ (`faq.html`). Effective/Last Updated 11/01/2026. Checkout has an unchecked required agreement checkbox (stub). No founder photo supplied; the mark stands in.

Open flags: FAQ reads "(50 average)" with no $; phone 425 (WA) area code with a Phoenix address; legal copy covers firearms/ammo sales while launch catalog is non-FFL accessories only.
