# aumakuadefense.com - URL Index (page discovery)

- Client: Aumakua Defense (aumakuadefense.com). Slug: `aumakuadefense`. House: TBD.
- Prepared: 2026-10-13 (America/Chicago) by Randy (Research). Raw captures: `/workspace/AumakuaDefense/raw/`.
- Status: LIVE, but the whole site is a GoDaddy Website Builder "coming soon" page. Every URL tested, including the online-store product URLs listed in the sitemap, returns the same 91,007-byte coming-soon HTML (identical md5).

## 1. Reachability (2026-10-13)

| Test | Result |
|---|---|
| DNS (dns.google) | A 104.21.21.59, 172.67.196.195 (Cloudflare). NS cortney/rodrigo.ns.cloudflare.com |
| https apex, normal browser UA | Timeout (curl 28), 0 bytes, on first attempts |
| https www | 301 to https://aumakuadefense.com/ |
| http apex / http www | Connect timeout (curl 28) |
| https apex pinned to 172.67.196.195 | 200 (intermittent; about half of requests time out) |
| https apex pinned to 104.21.21.59 | Timeout |
| Cloudflare challenge page | None seen. Failures are plain timeouts, not a challenge. |
| WebFetch (external fetcher) | Returned page title only, "Aumakua Defense" |
| Wayback CDX | Empty result `[]` first call; later calls hit "Internet Archive: Temporarily Offline". No snapshots confirmed. |
| Web search "Aumakua Defense" | No results for this business (only unrelated "Aumakua Technical Solutions" and Hawaiian culture pages). No socials or GBP found. |

## 2. Discovery sources

| Source | Result |
|---|---|
| robots.txt | `User-agent: *` / `Disallow: /404`. No Sitemap line. |
| sitemap.xml | Index with 2 children: sitemap.website.xml, sitemap.ols.xml |
| sitemap.website.xml | 1 URL: `/` (lastmod 2026-07-16) |
| sitemap.ols.xml | 5 URLs (lastmod 2026-10-08): `/ols/products` + 4 products |
| sitemap_index.xml, sitemap_products_1.xml, products.json, /wp-json/wc/store/products, /shop, /about | No response (timeout); not Shopify or WordPress (see platform-notes.md) |
| /contact, /terms-and-conditions | 404 |
| Nav crawl | No nav. Page has logo text, tagline, contact/email-signup form, footer only. |

## 3. URL index

| # | URL | Status | Decision | Reason |
|---|---|---|---|---|
| 1 | https://aumakuadefense.com/ | 200 coming-soon | KEEP | Home; rebuild as real storefront home |
| 2 | https://www.aumakuadefense.com/ | 301 to apex | MERGE into #1 | Host variant; keep apex canonical |
| 3 | https://aumakuadefense.com/ols/products | 200 (serves coming-soon page) | KEEP | Shop index; needs real catalog. Redirect to new /shop |
| 4 | /ols/products/edc-gear-pouch | in sitemap; timeout on fetch | KEEP | Product slug exists; content not visible |
| 5 | /ols/products/iwb-kydex-holster | 200 (serves coming-soon page) | KEEP | Product slug exists; content not visible |
| 6 | /ols/products/pistol-grip-upgrade | 200 (serves coming-soon page) | KEEP | Product slug exists; content not visible |
| 7 | /ols/products/tactical-edc-light | in sitemap; timeout on fetch | KEEP | Product slug exists; content not visible |
| 8 | /contact | 404 | DROP | Does not exist; proto adds its own Contact page |
| 9 | /terms-and-conditions | 404 | DROP | Does not exist; proto needs real policies from client |
| 10 | /404 | robots-disallowed | DROP | System page |

Counts: KEEP 6, MERGE 1, DROP 3 (10 rows).

No categories exist in the sitemap. Product names, prices, specs and photos are NOT visible publicly (store is hidden behind coming-soon mode); slugs above are the only product evidence. Get the catalog from the client or GoDaddy Online Store export.
