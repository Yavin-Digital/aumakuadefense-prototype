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
      tags: ["lights", "edc"],
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
    }
  };
})();
