document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/products")
    .then(res => res.json())
    .then(products => {
      const box = document.getElementById("products");

      if (products.length === 0) {
        box.innerHTML = "<p>No products available</p>";
        return;
      }

      products.forEach(p => {
        box.innerHTML += `
          <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <h3>${p.name}</h3>
            <p>${p.description}</p>
            <strong>Rs ${p.price}</strong>
          </div>
        `;
      });
    })
    .catch(() => {
      document.getElementById("products").innerHTML =
        "<p>Error loading products</p>";
    });
});
