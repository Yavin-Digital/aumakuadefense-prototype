/* Global catalog, categories, and NAP. Prices, photos, specs, and contact
   details are unpublished. Do not put a number in price. */
(function () {
  var products = [
    {
      id: "edc-gear-pouch",
      slug: "edc-gear-pouch",
      title: "EDC Gear Pouch",
      nameStatus: "Name TBC",
      categoryId: "accessories",
      tags: ["edc"],
      price: null,
      priceLabel: "Price: client to supply",
      description: "[CLIENT TO SUPPLY]",
      specs: "[CLIENT TO SUPPLY]",
      variants: [
        {
          id: "edc-gear-pouch-unspecified",
          sku: "[CLIENT TO SUPPLY]",
          name: "Variant: client to supply",
          options: {},
          price: null
        }
      ]
    },
    {
      id: "iwb-kydex-holster",
      slug: "iwb-kydex-holster",
      title: "IWB Kydex Holster",
      nameStatus: "Name TBC",
      categoryId: "accessories",
      tags: ["holsters"],
      price: null,
      priceLabel: "Price: client to supply",
      description: "[CLIENT TO SUPPLY]",
      specs: "[CLIENT TO SUPPLY]",
      variants: [
        {
          id: "iwb-kydex-holster-unspecified",
          sku: "[CLIENT TO SUPPLY]",
          name: "Variant: client to supply",
          options: {},
          price: null
        }
      ]
    },
    {
      id: "pistol-grip-upgrade",
      slug: "pistol-grip-upgrade",
      title: "Pistol Grip Upgrade",
      nameStatus: "Name TBC",
      categoryId: "accessories",
      tags: ["grips"],
      price: null,
      priceLabel: "Price: client to supply",
      description: "[CLIENT TO SUPPLY]",
      specs: "[CLIENT TO SUPPLY]",
      variants: [
        {
          id: "pistol-grip-upgrade-unspecified",
          sku: "[CLIENT TO SUPPLY]",
          name: "Variant: client to supply",
          options: {},
          price: null
        }
      ]
    },
    {
      id: "tactical-edc-light",
      slug: "tactical-edc-light",
      title: "Tactical EDC Light",
      nameStatus: "Name TBC",
      categoryId: "accessories",
      tags: ["lights"],
      price: null,
      priceLabel: "Price: client to supply",
      description: "[CLIENT TO SUPPLY]",
      specs: "[CLIENT TO SUPPLY]",
      variants: [
        {
          id: "tactical-edc-light-unspecified",
          sku: "[CLIENT TO SUPPLY]",
          name: "Variant: client to supply",
          options: {},
          price: null
        }
      ]
    }
  ];

  var tagNames = {
    edc: "EDC",
    holsters: "Holsters",
    grips: "Grips",
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
    "edc-gear-pouch": shot("pouch", "Example: a close-up of brown leather", 1280, 1600, [640, 1280]),
    "iwb-kydex-holster": shot("holster", "Example: a black leather holster", 1280, 1600, [640, 1280]),
    "pistol-grip-upgrade": shot("grip", "Example: a close-up of a stippled pistol grip", 1280, 1600, [640, 1280]),
    "tactical-edc-light": shot("light", "Example: a black flashlight", 1280, 1600, [640, 1280])
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
      { id: "edc", name: "EDC" },
      { id: "holsters", name: "Holsters" },
      { id: "grips", name: "Grips" },
      { id: "lights", name: "Lights" }
    ],
    products: products,
    productById: function (id) {
      return products.filter(function (p) { return p.id === id; })[0] || null;
    },
    displayName: function (product) {
      return product.title + " — name TBC";
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
          '<span class="tile-title">' + esc(product.title + " — name TBC") + "</span>" +
          '<span class="tile-meta">' + tags + "</span>" +
          '<span class="tile-price">' + esc(product.priceLabel) + "</span>" +
        "</span></a>";
    }
  };
})();
