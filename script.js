// Sample product data
const products = [
    { id: 1, name: "T-Shirt", price: 19.99, category: "clothing", image: "images/tshirt.jpg" },
    { id: 2, name: "Headphones", price: 49.99, category: "electronics", image: "images/headphones.jpg" },
    // Add more products
];

// Cart array
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCartCount();
    
    if (document.getElementById('all-products')) {
        renderAllProducts();
    }
    
    if (document.getElementById('cart-items')) {
        renderCart();
    }
});

// Load featured products on homepage
function loadProducts() {
    const container = document.querySelector('.featured .products');
    if (!container) return;
    
    const featured = products.slice(0, 4);
    featured.forEach(product => {
        container.appendChild(createProductCard(product));
    });
}

// Create product card HTML
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h3>${product.name}</h3>
        <p>$${product.price.toFixed(2)}</p>
        <button class="btn add-to-cart" data-id="${product.id}">Add to Cart</button>
    `;
    return card;
}

// Add to cart
document.addEventListener('click', e => {
    if (e.target.classList.contains('add-to-cart')) {
        const productId = parseInt(e.target.dataset.id);
        addToCart(productId);
    }
});

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    
    updateCartCount();
    localStorage.setItem('cart', JSON.stringify(cart));
}

function updateCartCount() {
    const count = cart.reduce((total, item) => total + item.quantity, 0);
    document.querySelectorAll('#cart-count').forEach(el => {
        el.textContent = count;
    });
}

// Cart page functions
function renderCart() {
    const container = document.getElementById('cart-items');
    container.innerHTML = '';
    
    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div>
                <h4>${item.name}</h4>
                <p>$${item.price} x ${item.quantity}</p>
            </div>
            <button class="remove-item" data-id="${item.id}">Remove</button>
        `;
        container.appendChild(cartItem);
    });
    
    updateTotal();
}

function updateTotal() {
    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-price').textContent = total.toFixed(2);
}
