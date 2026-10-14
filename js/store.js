/* Shop, product, cart, checkout, and the contact form.
   Totals stay blank until the client supplies prices. */
(function () {
  function esc(value) {
    return String(value == null ? "" : value).replace(/[&<>"']/g, function (ch) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[ch];
    });
  }

  function photoSlot(label, image, opts) {
    if (image) return window.AD.photoHtml(image, opts);
    return '<div class="photo-slot" role="img" aria-label="' + esc(label) + '"><span>' + esc(label) + "</span></div>";
  }

  function tile(product, opts) {
    return window.AD.tileHtml(product, opts);
  }

  function moneyDash() {
    return '<span aria-label="Price not supplied">—</span>';
  }

  function renderCatalog(root, list) {
    if (!list.length) {
      root.innerHTML = "<p>No products match this filter. The catalog is the four accessory slugs from the store sitemap.</p>";
      return;
    }
    root.innerHTML = list.map(tile).join("");
  }

  function pageShop() {
    var root = document.getElementById("catalog");
    if (!root) return;
    renderCatalog(root, window.AD.products);
  }

  function pageCategory() {
    var root = document.getElementById("catalog");
    if (!root) return;
    var id = new URLSearchParams(location.search).get("c") || "accessories";
    var title = document.getElementById("category-title");
    var list = window.AD.products;
    if (id === "accessories") {
      if (title) title.textContent = "Accessories";
      document.title = "Accessories — Aumakua Defense";
    } else if (window.AD.tagName(id) && ["edc", "holsters", "grips", "lights"].indexOf(id) !== -1) {
      if (title) title.textContent = window.AD.tagName(id);
      document.title = window.AD.tagName(id) + " — Aumakua Defense";
      list = window.AD.products.filter(function (p) { return p.tags.indexOf(id) !== -1; });
    } else {
      if (title) title.textContent = "Accessories";
      list = window.AD.products;
    }
    document.querySelectorAll("[data-filter]").forEach(function (link) {
      if (link.getAttribute("data-filter") === id) link.setAttribute("aria-current", "page");
      else link.removeAttribute("aria-current");
    });
    renderCatalog(root, list);
  }

  function pageProduct() {
    var root = document.getElementById("product-root");
    if (!root) return;
    var id = new URLSearchParams(location.search).get("id");
    var product = window.AD.productById(id);
    if (!product) {
      root.innerHTML = "<h1>Product not in this prototype</h1><p>The known slugs are the four accessories in the shop.</p><p><a class=\"btn\" href=\"shop.html\">Back to the shop</a></p>";
      return;
    }
    document.title = window.AD.displayName(product) + " — Aumakua Defense";
    var variant = product.variants[0];
    var related = window.AD.related(product).map(function (item) {
      return tile(item, { related: true });
    }).join("");
    var options = product.variants.map(function (item) {
      return '<option value="' + esc(item.id) + '">' + esc(item.name) + "</option>";
    }).join("");
    root.innerHTML =
      '<div class="page">' +
        '<p class="crumb"><a href="shop.html">Shop</a> / <a href="category.html?c=accessories">Accessories</a></p>' +
        '<div class="product-layout">' +
          '<div class="gallery">' +
            photoSlot("PRODUCT PHOTO — client to supply", product.image, { eager: true, sizes: "(min-width: 720px) 72vw, 92vw" }) +
          "</div>" +
          '<div class="product-buy">' +
            '<p class="kicker">Accessories</p>' +
            '<h1>' + esc(window.AD.displayName(product)) + "</h1>" +
            '<p class="price-line">' + esc(product.priceLabel) + "</p>" +
            '<p class="chip-row"><span class="supply-chip">Description — client to supply</span></p>' +
            '<form class="buy-form" id="buy-form">' +
              '<label for="variant">Variant <select id="variant">' + options + "</select></label>" +
              '<label for="qty">Quantity <input id="qty" type="number" min="1" max="99" value="1" inputmode="numeric"></label>' +
              '<button class="btn" type="submit">Add to cart</button>' +
              '<p id="added" class="form-status" role="status"></p>' +
            "</form>" +
          "</div>" +
        "</div>" +
      "</div>" +
      '<section class="room room-paper reveal">' +
        '<div class="measure">' +
          '<h2><span class="metal">Specs</span></h2>' +
          '<p class="chip-row"><span class="supply-chip">Specs — client to supply</span></p>' +
          '<p class="review-note">Draft: no public name, price, spec, or photo was on the live store. The title is the slug in title case. Slug ' + esc(product.slug) + ".</p>" +
        "</div>" +
      "</section>" +
      '<section class="room room-ink reveal"><div class="room-inner"><h2><span class="metal">Related</span></h2><div class="catalog catalog-related">' + related + "</div></div></section>";

    var data = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": window.AD.displayName(product),
      "sku": product.slug,
      "description": "Product details have not been supplied. Price is not published.",
      "category": "Accessories"
    };
    var script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);

    document.getElementById("buy-form").addEventListener("submit", function (event) {
      event.preventDefault();
      var qty = document.getElementById("qty").value;
      var variantId = document.getElementById("variant").value || variant.id;
      window.ADCart.add(product.id, variantId, qty);
      document.getElementById("added").textContent = "Added to the cart on this browser. Price is still not supplied.";
    });
  }

  function lineView(line) {
    var product = window.AD.productById(line.productId);
    var name = product ? window.AD.displayName(product) : line.productId;
    var variant = "Variant: client to supply";
    if (product) {
      product.variants.forEach(function (item) {
        if (item.id === line.variantId) variant = item.name;
      });
    }
    return '<article class="cart-line" data-line="' + esc(line.id) + '">' +
      photoSlot("PRODUCT PHOTO — client to supply", product && product.image, { sizes: "(max-width: 699px) 92vw, 140px" }) +
      '<div><h2><a href="product.html?id=' + esc(line.productId) + '">' + esc(name) + "</a></h2>" +
      "<p>" + esc(variant) + "</p>" +
      '<label>Quantity <input class="line-qty" type="number" min="1" max="99" value="' + esc(line.qty) + '" inputmode="numeric"></label> ' +
      '<button type="button" class="btn btn-line line-remove" aria-label="Remove ' + esc(name) + '">Remove</button></div>' +
      '<p class="line-amount">' + moneyDash() + "</p></article>";
  }

  function focusCart(root, restore) {
    if (!restore) return;
    var qty = null;
    if (restore.lineId) {
      Array.prototype.forEach.call(root.querySelectorAll(".cart-line"), function (row) {
        if (row.getAttribute("data-line") === restore.lineId) qty = row.querySelector(".line-qty");
      });
    }
    if (!qty) qty = root.querySelector(".line-qty");
    if (qty) {
      qty.focus({ preventScroll: true });
      return;
    }
    var heading = root.querySelector("h1");
    if (heading) {
      heading.tabIndex = -1;
      heading.focus();
    }
  }

  function pageCart(restore) {
    var root = document.getElementById("cart-root");
    if (!root) return;
    var lines = window.ADCart.lines();
    if (!lines.length) {
      root.innerHTML = "<h1>Cart</h1><p>The cart is empty.</p><p><a class=\"btn\" href=\"shop.html\">View the shop</a></p>";
      focusCart(root, restore);
      return;
    }
    root.innerHTML =
      "<h1>Cart</h1>" +
      '<div class="cart-lines">' + lines.map(lineView).join("") + "</div>" +
      '<aside class="summary order-summary">' +
        "<h2>Order summary</h2>" +
        "<p>Subtotal " + moneyDash() + "</p>" +
        "<p>Tax calculated at checkout</p>" +
        "<p>Shipping calculated at checkout</p>" +
        "<p><strong>Totals calculated once pricing is supplied.</strong></p>" +
        '<a class="btn" href="checkout.html">Checkout</a>' +
      "</aside>";
    root.querySelectorAll(".cart-line").forEach(function (row) {
      var id = row.getAttribute("data-line");
      row.querySelector(".line-qty").addEventListener("change", function (event) {
        window.ADCart.setQty(id, event.target.value);
        pageCart({ lineId: id });
      });
      row.querySelector(".line-remove").addEventListener("click", function () {
        window.ADCart.remove(id);
        pageCart({ removed: true });
      });
    });
    focusCart(root, restore);
  }

  function pageCheckout() {
    var root = document.getElementById("checkout-root");
    if (!root) return;
    var lines = window.ADCart.lines();
    if (!lines.length) {
      root.innerHTML = "<h1>Checkout</h1><p>The cart is empty, so there is nothing to check out.</p><p><a class=\"btn\" href=\"shop.html\">View the shop</a></p>";
      return;
    }
    var rows = lines.map(function (line) {
      var product = window.AD.productById(line.productId);
      var name = product ? window.AD.displayName(product) : line.productId;
      return "<li>" + esc(name) + " × " + esc(line.qty) + " <span>" + moneyDash() + "</span></li>";
    }).join("");
    root.innerHTML =
      "<h1>Checkout</h1>" +
      '<p class="pay-note">Prototype — no payment is processed.</p>' +
      '<form id="checkout-form" class="checkout-grid" novalidate>' +
        "<fieldset><legend>Contact</legend>" +
          '<label>Name <input name="name" required autocomplete="name"></label>' +
          '<label>Email <input name="email" type="email" required autocomplete="email"></label>' +
          '<label>Phone <input name="phone" type="tel" required autocomplete="tel"></label>' +
        "</fieldset>" +
        "<fieldset><legend>Shipping</legend>" +
          '<label>Address <input name="address" required autocomplete="street-address"></label>' +
          '<div class="split">' +
            '<label>City <input name="city" required autocomplete="address-level2"></label>' +
            '<label>Region <input name="region" required autocomplete="address-level1"></label>' +
          "</div>" +
          '<div class="split">' +
            '<label>Postal code <input name="postal" required autocomplete="postal-code" inputmode="numeric" maxlength="12"></label>' +
            '<label>Country <input name="country" required autocomplete="country-name"></label>' +
          "</div>" +
        "</fieldset>" +
        "<fieldset><legend>Payment</legend>" +
          '<p class="pay-note">Prototype — no payment is processed. Card fields are not saved and are not sent to a gateway.</p>' +
          '<label>Name on card <input name="cardname" required autocomplete="cc-name"></label>' +
          '<label>Card number <input name="cardnumber" required inputmode="numeric" autocomplete="cc-number" maxlength="23"></label>' +
          '<div class="split">' +
            '<label>Expiration <input name="exp" required inputmode="numeric" autocomplete="cc-exp" placeholder="MM / YY" maxlength="7"></label>' +
            '<label>Security code <input name="cvc" required inputmode="numeric" autocomplete="cc-csc" maxlength="4"></label>' +
          "</div>" +
        "</fieldset>" +
        '<aside class="summary order-summary">' +
          "<h2>Order summary</h2><ul>" + rows + "</ul>" +
          "<p>Subtotal " + moneyDash() + "</p>" +
          "<p>Tax calculated at checkout</p>" +
          "<p>Shipping calculated at checkout</p>" +
          "<p><strong>Totals calculated once pricing is supplied.</strong></p>" +
          '<button class="btn" type="submit">Place order</button>' +
          '<p id="checkout-status" class="form-status" role="status"></p>' +
        "</aside>" +
      "</form>";

    function showFieldErrors(form) {
      var count = 0;
      Array.prototype.forEach.call(form.querySelectorAll("input, select, textarea"), function (input) {
        var id = "err-" + (input.name || input.id);
        var old = document.getElementById(id);
        if (old) old.remove();
        if (!input.checkValidity()) {
          count += 1;
          input.setAttribute("aria-invalid", "true");
          var msg = document.createElement("span");
          msg.id = id;
          msg.className = "field-error";
          msg.textContent = input.validationMessage || "This field needs attention.";
          input.setAttribute("aria-describedby", id);
          input.insertAdjacentElement("afterend", msg);
        } else {
          input.removeAttribute("aria-invalid");
          if (input.getAttribute("aria-describedby") === id) input.removeAttribute("aria-describedby");
        }
      });
      return count;
    }

    document.getElementById("checkout-form").addEventListener("submit", function (event) {
      event.preventDefault();
      var form = event.target;
      var status = document.getElementById("checkout-status");
      var bad = showFieldErrors(form);
      if (bad) {
        if (status) status.textContent = bad + (bad === 1 ? " field needs attention." : " fields need attention.");
        var first = form.querySelector("[aria-invalid='true']");
        if (first) first.focus();
        return;
      }
      if (status) status.textContent = "";
      var data = new FormData(form);
      var token = Math.random().toString(36).slice(2, 6).toUpperCase();
      var order = {
        number: "SAMPLE-AD-" + token,
        sample: true,
        payment: "not processed",
        contact: {
          name: data.get("name"),
          email: data.get("email"),
          phone: data.get("phone")
        },
        shipping: {
          address: data.get("address"),
          city: data.get("city"),
          region: data.get("region"),
          postal: data.get("postal"),
          country: data.get("country")
        },
        lines: window.ADCart.lines().map(function (line) {
          var product = window.AD.productById(line.productId);
          return {
            productId: line.productId,
            variantId: line.variantId,
            qty: line.qty,
            name: product ? window.AD.displayName(product) : line.productId
          };
        })
      };
      sessionStorage.setItem("ad_sample_order", JSON.stringify(order));
      window.ADCart.clear();
      location.href = "order-confirmation.html";
    });
  }

  function pageConfirm() {
    var root = document.getElementById("confirm-root");
    if (!root) return;
    var raw = sessionStorage.getItem("ad_sample_order");
    if (!raw) {
      root.innerHTML = "<h1>No sample order</h1><p>Place a simulated order from the cart to see a sample confirmation.</p><p><a class=\"btn\" href=\"shop.html\">View the shop</a></p>";
      return;
    }
    var order;
    try { order = JSON.parse(raw); } catch (err) { order = null; }
    if (!order || !order.sample) {
      root.innerHTML = "<h1>No sample order</h1><p><a class=\"btn\" href=\"shop.html\">View the shop</a></p>";
      return;
    }
    var rows = (order.lines || []).map(function (line) {
      return "<li>" + esc(line.name) + " × " + esc(line.qty) + " " + moneyDash() + "</li>";
    }).join("");
    root.innerHTML =
      '<p class="kicker">Sample only</p>' +
      "<h1>Sample order " + esc(order.number) + "</h1>" +
      "<p><strong>This is a sample confirmation. No order was placed and no payment was processed.</strong></p>" +
      "<p>Prototype — no payment is processed.</p>" +
      "<h2>Contact</h2><p>" + esc(order.contact.name) + "<br>" + esc(order.contact.email) + "<br>" + esc(order.contact.phone) + "</p>" +
      "<h2>Ship to</h2><p>" + esc(order.shipping.address) + "<br>" + esc(order.shipping.city) + ", " + esc(order.shipping.region) + " " + esc(order.shipping.postal) + "<br>" + esc(order.shipping.country) + "</p>" +
      "<h2>Items</h2><ul>" + rows + "</ul>" +
      "<p>Totals calculated once pricing is supplied.</p>" +
      '<p><a class="btn" href="shop.html">Back to the shop</a></p>';
  }

  function pageContact() {
    var form = document.getElementById("contact-form");
    if (!form) return;
    form.addEventListener("submit", function (event) {
      event.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var status = document.getElementById("contact-status");
      status.textContent = "Prototype — this form is not sent. Nothing was delivered.";
      form.reset();
    });
  }

  var page = document.body.getAttribute("data-page");
  if (page === "shop") pageShop();
  if (page === "category") pageCategory();
  if (page === "product") pageProduct();
  if (page === "cart") pageCart();
  if (page === "checkout") pageCheckout();
  if (page === "confirm") pageConfirm();
  if (page === "contact") pageContact();
})();
