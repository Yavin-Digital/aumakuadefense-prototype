/* Global catalog, categories, and NAP. Products are generic EXAMPLE items
   (non-FFL accessories only, no brands). priceLabel shows an example price;
   price stays null so cart totals stay blank until the client supplies real prices. */
(function () {
  var products = [
    {
      id: "plate-carrier",
      slug: "plate-carrier",
      title: "Plate Carrier",
      nameStatus: "Example item",
      categoryId: "accessories",
      tags: ["carriers"],
      price: null,
      priceLabel: "Example price: $149",
      description: "[CLIENT TO SUPPLY]",
      specs: "[CLIENT TO SUPPLY]",
      variants: [
        {
          id: "plate-carrier-unspecified",
          sku: "[CLIENT TO SUPPLY]",
          name: "Variant: client to supply",
          options: {},
          price: null
        }
      ]
    },
    {
      id: "owb-iwb-holster",
      slug: "owb-iwb-holster",
      title: "OWB/IWB Holster",
      nameStatus: "Example item",
      categoryId: "accessories",
      tags: ["holsters"],
      price: null,
      priceLabel: "Example price: $59",
      description: "[CLIENT TO SUPPLY]",
      specs: "[CLIENT TO SUPPLY]",
      variants: [
        {
          id: "owb-iwb-holster-unspecified",
          sku: "[CLIENT TO SUPPLY]",
          name: "Variant: client to supply",
          options: {},
          price: null
        }
      ]
    },
    {
      id: "rifle-scope",
      slug: "rifle-scope",
      title: "Rifle Scope",
      nameStatus: "Example item",
      categoryId: "accessories",
      tags: ["optics"],
      price: null,
      priceLabel: "Example price: $249",
      description: "[CLIENT TO SUPPLY]",
      specs: "[CLIENT TO SUPPLY]",
      variants: [
        {
          id: "rifle-scope-unspecified",
          sku: "[CLIENT TO SUPPLY]",
          name: "Variant: client to supply",
          options: {},
          price: null
        }
      ]
    },
    {
      id: "tactical-flashlight",
      slug: "tactical-flashlight",
      title: "Tactical Flashlight",
      nameStatus: "Example item",
      categoryId: "accessories",
      tags: ["lights"],
      price: null,
      priceLabel: "Example price: $79",
      description: "[CLIENT TO SUPPLY]",
      specs: "[CLIENT TO SUPPLY]",
      variants: [
        {
          id: "tactical-flashlight-unspecified",
          sku: "[CLIENT TO SUPPLY]",
          name: "Variant: client to supply",
          options: {},
          price: null
        }
      ]
    }
  ];

  var tagNames = {
    optics: "Optics",
    holsters: "Holsters",
    carriers: "Carriers",
    lights: "Lights"
  };

  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function shot(name, alt, width, height, widths) {
    var srcset = widths.map(function (w) {
      return "assets/photos/" + name + "-" + w + ".webp " + w + "w";
    }).join(", ");
    var mid = widths[Math.min(1, widths.length - 1)];
    return {
      src: "assets/photos/" + name + "-" + mid + ".webp",
      srcset: srcset,
      width: width,
      height: height,
      alt: alt
    };
  }

  var photos = {
    "plate-carrier": shot("carrier", "Example: a camouflage plate carrier worn from behind", 1280, 1600, [640, 1280]),
    "owb-iwb-holster": shot("holster", "Example: a black leather holster", 1280, 1600, [640, 1280]),
    "rifle-scope": shot("scope", "Example: a rifle scope with flip caps on a mounted rifle", 1280, 1600, [640, 1280]),
    "tactical-flashlight": shot("light", "Example: a black flashlight", 1280, 1600, [640, 1280])
  };
  products.forEach(function (product) {
    product.image = photos[product.id];
  });

  window.AD = {
    nap: {
      name: "Aumakua Defense",
      tagline: "Where Ancient Protection Meets Modern Precision",
      phone: null,
      email: null,
      address: null,
      hours: null
    },
    categories: [
      { id: "accessories", slug: "accessories", name: "Accessories" }
    ],
    tags: [
      { id: "optics", name: "Optics" },
      { id: "holsters", name: "Holsters" },
      { id: "carriers", name: "Carriers" },
      { id: "lights", name: "Lights" }
    ],
    products: products,
    productById: function (id) {
      return products.filter(function (p) { return p.id === id; })[0] || null;
    },
    displayName: function (product) {
      return product.title + " (Example)";
    },
    tagName: function (id) {
      return tagNames[id] || id;
    },
    related: function (product) {
      return products.filter(function (p) { return p.id !== product.id; });
    },
    photoHtml: function (image, opts) {
      opts = opts || {};
      if (!image) return "";
      var sizes = opts.related
        ? "(min-width: 1440px) 34vw, (min-width: 700px) 70vw, 92vw"
        : (opts.sizes || "(min-width: 1440px) 22vw, (min-width: 700px) 70vw, 92vw");
      var load = opts.eager ? ' fetchpriority="high"' : ' loading="lazy"';
      return '<div class="photo-slot photo-real">' +
        '<img src="' + esc(image.src) + '" srcset="' + esc(image.srcset) + '" sizes="' + esc(sizes) + '" alt="' + esc(image.alt) + '" width="' + image.width + '" height="' + image.height + '"' + load + ' decoding="async">' +
        '<span class="example-label">Example image</span></div>';
    },
    tileHtml: function (product, opts) {
      var tags = product.tags.map(function (id) {
        return '<span class="mini-tag">' + esc(tagNames[id] || id) + "</span>";
      }).join("");
      return '<a class="product-tile" href="product.html?id=' + esc(product.id) + '">' +
        window.AD.photoHtml(product.image, opts) +
        '<span class="tile-body">' +
          '<span class="tile-title">' + esc(product.title + " (Example)") + "</span>" +
          '<span class="tile-meta">' + tags + "</span>" +
          '<span class="tile-price">' + esc(product.priceLabel) + "</span>" +
        "</span></a>";
    }
  };
})();
