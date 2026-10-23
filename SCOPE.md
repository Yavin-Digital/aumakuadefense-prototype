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
| Phone | |
| Email | |
| Address | |
| Hours | |
| Owner | |

## Home section order and motion (2026-10-23)

Home order: hero, weave divider, Built for, Shop (catalog), Featured spotlight, brand story, gear-up CTA. Product-card tilt max 2.5deg (Y) / 2deg (X) with eased smoothing; hero parallax about half the original strength; all motion off under prefers-reduced-motion; embers kept.
