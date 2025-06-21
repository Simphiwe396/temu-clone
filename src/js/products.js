let products = [];

async function loadProducts() {
  try {
    // Updated to use the API endpoint instead of direct file access
    const response = await fetch('/api/products');
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    products = data.flashSaleProducts;
    renderProducts();
    
    // Initialize any product interactions
    initProductInteractions();
    
  } catch (error) {
    console.error('Error loading products:', error);
    showErrorUI();
  }
}

function renderProducts() {
  const container = document.getElementById('flash-sale-products');
  if (!container) return;
  
  container.innerHTML = '';
  
  products.forEach(product => {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <div class="product-badge">${product.badge}</div>
      <img src="${product.image.startsWith('http') ? product.image : '/images/products/' + product.image}" 
           alt="${product.title}" 
           class="product-image"
           loading="lazy">
      <div class="product-info">
        <h3>${product.title}</h3>
        <div class="price-container">
          <span class="current-price">R${product.price.toFixed(2)}</span>
          <span class="original-price">R${product.originalPrice.toFixed(2)}</span>
          <span class="discount-badge">${calculateDiscount(product.price, product.originalPrice)}% OFF</span>
        </div>
        <div class="rating">${generateStarRating(product.rating)} (${product.rating})</div>
        <button class="btn" onclick="addToCart(${product.id})" aria-label="Add ${product.title} to cart">
          Add to Cart
        </button>
      </div>
    `;
    container.appendChild(card);
  });
}

// Helper functions
function calculateDiscount(current, original) {
  return Math.round(((original - current) / original) * 100);
}

function generateStarRating(rating) {
  return '★'.repeat(Math.floor(rating)) + '☆'.repeat(5 - Math.floor(rating));
}

function initProductInteractions() {
  // Add any product-specific interactions here
  if (window.VanillaTilt && document.querySelectorAll('.product-card').length > 0) {
    VanillaTilt.init(document.querySelectorAll('.product-card'), {
      max: 5,
      speed: 300,
      glare: true,
      'max-glare': 0.2
    });
  }
}

function showErrorUI() {
  const container = document.getElementById('flash-sale-products');
  if (container) {
    container.innerHTML = `
      <div class="error-message">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>Products Failed to Load</h3>
        <p>Please refresh the page or try again later.</p>
        <button onclick="window.location.reload()" class="btn">
          <i class="fas fa-sync-alt"></i> Refresh
        </button>
      </div>
    `;
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  loadProducts();
  
  // Add intersection observer for lazy loading
  if ('IntersectionObserver' in window) {
    const lazyImageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const lazyImage = entry.target;
          lazyImage.src = lazyImage.dataset.src;
          lazyImageObserver.unobserve(lazyImage);
        }
      });
    });
    
    document.querySelectorAll('.product-image').forEach(img => {
      lazyImageObserver.observe(img);
    });
  }
});