# Aumakua Defense - Platform Notes (2026-10-13)

## Platform: GoDaddy Website Builder + GoDaddy Online Store (OLS)
Evidence:
- `<meta name="generator" content="Starfield Technologies; Go Daddy Website Builder 8.0.0000"/>`
- Assets on img1.wsimg.com/isteam/...; footer "Powered by" link to godaddy.com/websites/website-builder
- Sitemap children `sitemap.website.xml` and `sitemap.ols.xml`; store paths `/ols/products/...` (GoDaddy Online Store pattern)
- Not Shopify (/products.json no response) and not WooCommerce (/wp-json no response, no wp-content)
- Served through Cloudflare (DNS A records and NS)

## Payment processor
Not visible. Store is hidden; no checkout, Stripe, PayPal or GoDaddy Payments markup found on the served page.

## FFL / age-gate / compliance language
None found. No age gate, no FFL statement, no compliance or legal disclaimer on the live page. Only text resembling policy: "This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply." and the cookie notice "We use cookies to analyze website traffic and optimize your website experience. By accepting our use of cookies, your data will be aggregated with all other user data."

## Shipping restrictions
None published.

## Note for build
The 4 known product slugs are accessories (pouch, IWB Kydex holster, pistol grip, EDC light). No firearm SKUs visible. Confirm with client whether firearms or regulated parts will be sold before designing age-gate/FFL flows; GoDaddy Payments and most processors restrict firearm sales.
