// productDetail.js

// Get product ID from URL query string
function getProductIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get("id");
}

async function loadProductDetails() {
  const productId = getProductIdFromUrl();
  const main = document.getElementById("main");

  if (!productId) {
    main.innerHTML = "<h2>Product ID not specified.</h2>";
    return;
  }

  try {
    // Fetch product details JSON file
    const response = await fetch("./productDetails.json");
    if (!response.ok) throw new Error("Failed to load product details.");
    const detailsData = await response.json();

    const product = detailsData[productId];
    if (!product) {
      main.innerHTML = "<h2>Product not found.</h2>";
      return;
    }

    // Build details list dynamically (skip empty or missing values)
    let detailsList = "";
    for (const [key, value] of Object.entries(product.details)) {
      if (value && value.trim() !== "") {
        detailsList += `<li><strong>${key}:</strong> ${value}</li>`;
      }
    }

    // Render product detail section
    main.innerHTML = `
      <section class="product-detail-section">
        <img src="${product.image}" alt="${product.name}" class="product-detail-image" />
        <div class="product-detail-info">
          <h2>${product.name}</h2>
          <p><strong>Short description:</strong> ${product.description}</p>
          <br>
          <p><strong>Details:</strong></p>
          <ul>
            ${detailsList}
          </ul>
          <button onclick="window.location.href='index.html'">← Back to Products</button>
        </div>
      </section>
    `;

  } catch (error) {
    main.innerHTML = `<h2>Error loading product details. Please try again later.</h2>`;
    console.error(error);
  }
}

document.addEventListener("DOMContentLoaded", loadProductDetails);
