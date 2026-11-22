/* Shop, product, cart, checkout, and the contact form.
   Prices are the listed MAP from the client's product list. */
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

  function money(n) {
    return "$" + Number(n).toFixed(2);
  }

  function linePrice(line) {
    var product = window.AD.productById(line.productId);
    var price = null;
    if (product) {
      price = product.price;
      product.variants.forEach(function (item) {
        if (item.id === line.variantId && item.price != null) price = item.price;
      });
    }
    return price == null ? 0 : price * line.qty;
  }

  function subtotal(lines) {
    return lines.reduce(function (sum, line) { return sum + linePrice(line); }, 0);
  }

  function renderCatalog(root, list) {
    if (!list.length) {
      root.innerHTML = "<p>No products match this filter. Try another filter or view all items.</p>";
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
    var id = new URLSearchParams(location.search).get("c") || "medical-kits";
    var title = document.getElementById("category-title");
    var list = window.AD.products;
    if (id === "medical-kits") {
      if (title) title.textContent = "Medical Kits";
      document.title = "Medical Kits — Aumakua Defense";
    } else if (window.AD.tagName(id) && ["trauma-kits", "tourniquets"].indexOf(id) !== -1) {
      if (title) title.textContent = window.AD.tagName(id);
      document.title = window.AD.tagName(id) + " — Aumakua Defense";
      list = window.AD.products.filter(function (p) { return p.tags.indexOf(id) !== -1; });
    } else {
      if (title) title.textContent = "Medical Kits";
      list = window.AD.products;
    }
    var current = ["trauma-kits", "tourniquets"].indexOf(id) !== -1 ? id : "all";
    document.querySelectorAll("[data-filter]").forEach(function (link) {
      if (link.getAttribute("data-filter") === current) link.setAttribute("aria-current", "page");
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
      root.innerHTML = "<div class=\"page\"><h1>Product not found</h1><p>The items available are the Live the Creed medical kits in the shop.</p><p><a class=\"btn\" href=\"shop.html\">Back to the shop</a></p></div>";
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
        '<p class="crumb"><a href="shop.html">Shop</a> / <a href="category.html?c=medical-kits">Medical Kits</a></p>' +
        '<div class="product-layout">' +
          '<div class="gallery">' +
            photoSlot("Product photo", product.image, { eager: true, sizes: "(min-width: 720px) 72vw, 92vw" }) +
          "</div>" +
          '<div class="product-buy">' +
            '<p class="kicker">' + esc(product.brand) + "</p>" +
            '<h1>' + esc(window.AD.displayName(product)) + "</h1>" +
            '<p class="price-line">' + esc(product.priceLabel) + "</p>" +
            '<p>' + esc(product.description) + "</p>" +
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
          '<p>' + esc(product.specs) + "</p>" +
        "</div>" +
      "</section>" +
      '<section class="room room-ink reveal"><div class="room-inner"><h2><span class="metal">Related</span></h2><div class="catalog catalog-related">' + related + "</div></div></section>";

    var data = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": window.AD.displayName(product),
      "sku": product.variants[0].sku,
      "description": product.description,
      "brand": { "@type": "Brand", "name": product.brand },
      "offers": { "@type": "Offer", "priceCurrency": "USD", "price": product.price.toFixed(2) },
      "category": "Medical Kits"
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
      document.getElementById("added").textContent = "Added to the cart on this browser.";
    });
  }

  function lineView(line) {
    var product = window.AD.productById(line.productId);
    var name = product ? window.AD.displayName(product) : line.productId;
    var variant = "";
    if (product) {
      product.variants.forEach(function (item) {
        if (item.id === line.variantId) variant = item.name;
      });
    }
    return '<article class="cart-line" data-line="' + esc(line.id) + '">' +
      photoSlot("Product photo", product && product.image, { sizes: "(max-width: 719.98px) 92vw, 140px" }) +
      '<div><h2><a href="product.html?id=' + esc(line.productId) + '">' + esc(name) + "</a></h2>" +
      "<p>" + esc(variant) + "</p>" +
      '<label>Quantity <input class="line-qty" type="number" min="1" max="99" value="' + esc(line.qty) + '" inputmode="numeric"></label> ' +
      '<button type="button" class="btn btn-line line-remove" aria-label="Remove ' + esc(name) + '">Remove</button></div>' +
      '<p class="line-amount">' + money(linePrice(line)) + "</p></article>";
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

  function cartSay(root, text) {
    var live = document.getElementById("cart-live");
    if (!live) {
      live = document.createElement("p");
      live.id = "cart-live";
      live.className = "visually-hidden";
      live.setAttribute("role", "status");
      root.insertAdjacentElement("afterend", live);
    }
    live.textContent = text || "";
  }

  function pageCart(restore) {
    var root = document.getElementById("cart-root");
    if (!root) return;
    cartSay(root, restore && restore.say);
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
        "<p>Subtotal " + money(subtotal(lines)) + "</p>" +
        "<p>Tax calculated at checkout</p>" +
        "<p>Shipping calculated at checkout</p>" +
        '<a class="btn" href="checkout.html">Checkout</a>' +
      "</aside>";
    root.querySelectorAll(".cart-line").forEach(function (row) {
      var id = row.getAttribute("data-line");
      row.querySelector(".line-qty").addEventListener("change", function (event) {
        window.ADCart.setQty(id, event.target.value);
        var line = window.ADCart.lines().filter(function (item) { return item.id === id; })[0];
        var label = row.querySelector("h2").textContent;
        pageCart({ lineId: id, say: "Quantity updated: " + label + ", " + (line ? line.qty : "") + "." });
      });
      row.querySelector(".line-remove").addEventListener("click", function () {
        var label = row.querySelector("h2").textContent;
        window.ADCart.remove(id);
        pageCart({ removed: true, say: "Removed " + label + " from the cart." });
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
      return "<li>" + esc(name) + " × " + esc(line.qty) + " <span>" + money(linePrice(line)) + "</span></li>";
    }).join("");
    root.innerHTML =
      "<h1>Checkout</h1>" +
      '<p class="pay-note">No payment is processed.</p>' +
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
          '<p class="pay-note">No payment is processed. Card fields are not saved and are not sent to a gateway.</p>' +
          '<label>Name on card <input name="cardname" required autocomplete="cc-name"></label>' +
          '<label>Card number <input name="cardnumber" required inputmode="numeric" autocomplete="cc-number" maxlength="23"></label>' +
          '<div class="split">' +
            '<label>Expiration <input name="exp" required inputmode="numeric" autocomplete="cc-exp" placeholder="MM / YY" maxlength="7"></label>' +
            '<label>Security code <input name="cvc" required inputmode="numeric" autocomplete="cc-csc" maxlength="4"></label>' +
          "</div>" +
        "</fieldset>" +
        '<aside class="summary order-summary">' +
          "<h2>Order summary</h2><ul>" + rows + "</ul>" +
          "<p>Subtotal " + money(subtotal(lines)) + "</p>" +
          "<p>Tax calculated at checkout</p>" +
          "<p>Shipping calculated at checkout</p>" +
          '<ul class="agree-links" aria-label="Checkout policies"><li><a href="safety.html">Product Safety &amp; Checkout Disclaimer</a></li><li><a href="terms.html">Terms &amp; Conditions</a></li><li><a href="shipping.html">Shipping/FFL Policy</a></li></ul>' +
          '<label class="check agree"><input type="checkbox" name="agree" required> <span>I have read and agree to the Aumakua Defense Product Safety &amp; Checkout Disclaimer, Terms &amp; Conditions, and Shipping/FFL Policy. I certify that I am of legal age to purchase the items in my cart and am legally permitted to possess them in my jurisdiction.</span></label>' +
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
          /* Keep the message out of the label's accessible name; aria-describedby still reads it. */
          msg.setAttribute("aria-hidden", "true");
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
            amount: linePrice(line),
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
      return "<li>" + esc(line.name) + " × " + esc(line.qty) + " " + money(line.amount || 0) + "</li>";
    }).join("");
    root.innerHTML =
      '<p class="kicker">Sample only</p>' +
      "<h1>Sample order " + esc(order.number) + "</h1>" +
      "<p><strong>This is a sample confirmation. No order was placed and no payment was processed.</strong></p>" +
      "<p>No payment is processed.</p>" +
      "<h2>Contact</h2><p>" + esc(order.contact.name) + "<br>" + esc(order.contact.email) + "<br>" + esc(order.contact.phone) + "</p>" +
      "<h2>Ship to</h2><p>" + esc(order.shipping.address) + "<br>" + esc(order.shipping.city) + ", " + esc(order.shipping.region) + " " + esc(order.shipping.postal) + "<br>" + esc(order.shipping.country) + "</p>" +
      "<h2>Items</h2><ul>" + rows + "</ul>" +
      "<p>Subtotal " + money((order.lines || []).reduce(function (sum, line) { return sum + (line.amount || 0); }, 0)) + "</p>" +
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
      status.textContent = "This form is not sent. Nothing was delivered.";
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
