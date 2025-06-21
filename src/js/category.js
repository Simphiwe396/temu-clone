// Load category-specific products
async function loadCategoryProducts() {
    const category = window.location.pathname.split('/').pop().replace('.html', '');
    try {
        const response = await fetch('/src/data/products.json');
        const data = await response.json();
        
        // Filter products by category
        const categoryProducts = data.flashSaleProducts.filter(
            product => product.category.toLowerCase() === category.toLowerCase()
        );
        
        renderCategoryProducts(categoryProducts);
    } catch (error) {
        console.error('Error loading products:', error);
    }
}

function renderCategoryProducts(products) {
    const container = document.getElementById(`${category}-products`);
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <div class="product-badge">${product.badge}</div>
            <img src="${product.image}" alt="${product.title}" class="product-image">
            <div class="product-info">
                <h3>${product.title}</h3>
                <div class="price-container">
                    <span class="current-price">$${product.price.toFixed(2)}</span>
                    <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
                </div>
                <button class="btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `;
        container.appendChild(productCard);
    });
}

document.addEventListener('DOMContentLoaded', loadCategoryProducts);