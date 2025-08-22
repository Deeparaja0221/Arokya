import { productsData } from "./productsData.js";

// Helper: get query parameter
function getProductIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get("id"));
}

// Render product details based on ID
document.addEventListener('DOMContentLoaded', () => {
    const main = document.getElementById('main');
    const productId = getProductIdFromUrl();
    const product = productsData.find(p => p.id === productId);

    if (!product) {
        main.innerHTML = `<h2>Product not found</h2>`;
        return;
    }

    main.innerHTML = `
        <section class="product-detail-section">
            <img src="${product.image}" alt="${product.name}" class="product-detail-image" />
            <div class="product-detail-info">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <!-- Add more info as needed -->
                <button onclick="window.location.href='index.html'">← Back to Products</button>
            </div>
        </section>
    `;
});
