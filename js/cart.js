/* localStorage cart. Line shape matches a later ecomm-core line:
   id, productId, variantId, qty. No prices are stored. */
(function () {
  var KEY = "ad_cart";

  function read() {
    try {
      var data = JSON.parse(localStorage.getItem(KEY) || "[]");
      if (!Array.isArray(data)) return [];
      return data.filter(function (line) {
        return line && line.productId && line.variantId && line.qty > 0;
      });
    } catch (err) {
      return [];
    }
  }

  function write(lines) {
    localStorage.setItem(KEY, JSON.stringify(lines));
    document.dispatchEvent(new CustomEvent("ad:cart"));
  }

  function clamp(qty) {
    var n = parseInt(qty, 10);
    if (!n || n < 1) return 1;
    if (n > 99) return 99;
    return n;
  }

  window.ADCart = {
    lines: read,
    count: function () {
      return read().reduce(function (sum, line) { return sum + line.qty; }, 0);
    },
    add: function (productId, variantId, qty) {
      var lines = read();
      var found = null;
      lines.forEach(function (line) {
        if (line.productId === productId && line.variantId === variantId) found = line;
      });
      if (found) found.qty = clamp(found.qty + clamp(qty));
      else {
        lines.push({
          id: "line-" + Date.now().toString(36) + "-" + Math.random().toString(36).slice(2, 7),
          productId: productId,
          variantId: variantId,
          qty: clamp(qty)
        });
      }
      write(lines);
    },
    setQty: function (id, qty) {
      var lines = read();
      lines.forEach(function (line) {
        if (line.id === id) line.qty = clamp(qty);
      });
      write(lines);
    },
    remove: function (id) {
      write(read().filter(function (line) { return line.id !== id; }));
    },
    clear: function () {
      write([]);
    }
  };
})();
