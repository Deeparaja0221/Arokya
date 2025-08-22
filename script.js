import { productsData } from "./productsData.js"; // Note: Add .js extension

function renderProducts(products) {
  const container = document.getElementById('productsContainer');
  container.innerHTML = '';
  products.forEach(product => {
    const productEl = document.createElement('article');
    productEl.className = 'product-card';
    productEl.setAttribute('role', 'listitem');
    productEl.tabIndex = 0;
    productEl.innerHTML = `
      <img src="${product.image}" alt="${product.name}" />
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-desc">${product.description}</p>
        <button aria-label="View details of ${product.name}" data-id="${product.id}">View Details</button>
      </div>
    `;
    container.appendChild(productEl);
  });
}

function setupProductDetails() {
  const container = document.getElementById('productsContainer');
  container.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      const productId = e.target.getAttribute('data-id');
      window.location.href = `product.html?id=${productId}`;
    }
  });
}

function setupSearch() {
  const form = document.getElementById('searchForm');
  const input = document.getElementById('searchInput');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const term = input.value.toLowerCase();
    const filtered = productsData.filter(p =>
      p.name.toLowerCase().includes(term) ||
      p.description.toLowerCase().includes(term)
    );
    renderProducts(filtered);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  renderProducts(productsData);
  setupProductDetails();
  setupSearch();

  document.getElementById('shopNowBtn').addEventListener('click', () => {
    document.getElementById('products').scrollIntoView({behavior: 'smooth'});
  });

  document.getElementById('aboutUsBtn').addEventListener('click', () => {
    document.getElementById('about').scrollIntoView({behavior: 'smooth'});
  });

  document.getElementById('subscribeForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.getElementById('emailInput').value;
    if(email) {
      alert(`Thank you for subscribing, ${email}!`);
      e.target.reset();
    }
  });
});
