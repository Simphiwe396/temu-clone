let cart = [];

function addToCart(productId) {
    const product = flashSaleProducts.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        updateCartCount();
        showNotification(`${product.title} added to cart!`);
    }
}

function updateCartCount() {
    const countElement = document.querySelector('.cart-count');
    countElement.textContent = cart.length;
    countElement.style.display = cart.length > 0 ? 'flex' : 'none';
}

function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Initialize cart
document.addEventListener('DOMContentLoaded', updateCartCount);