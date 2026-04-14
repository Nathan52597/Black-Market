// Fixed: IDs must be unique, and prices are numbers (no 'NT$')
const PRODUCTS = [
    { id: 'greninja-ex', name: 'Greninja Ex', price: 200.00, rating: 5, reviews: 2450, img: 'https://img.shoplineapp.com/media/image_clips/69a15853a25d93d7bffac67a/original.jpg' },
    { id: 'dragonite-ex', name: 'Dragonite Ex', price: 200.00, rating: 5, reviews: 1120, img: 'https://down-tw.img.susercontent.com/file/tw-11134207-81ztf-mi9knne675z4e0' },
    { id: 'zygarde-ex', name: 'Zygarde Ex', price: 200.00, rating: 4, reviews: 450, img: 'https://cs-a.ecimg.tw/items/DGCQ39A900JMM4E/000007_1767934277.jpg' },
    { id: 'reshiram-ex', name: 'Zekrom ＆ Reshiram Ex', price: 400.00, rating: 5, reviews: 890, img: 'https://cs-d.ecimg.tw/items/DGBJQ9A900IX3MT/000002_1749536689.jpg' }
];

let cart = [];
const SHIPPING = 5.00;

function initStore() {
    const productGrid = document.getElementById('products');
    productGrid.innerHTML = PRODUCTS.map(p => `
        <div class="product-card">
            <img src="${p.img}" alt="${p.name}">
            <div class="rating">${'⭐'.repeat(p.rating)} (${p.reviews})</div>
            <h3>${p.name}</h3>
            <p class="price">$${p.price.toFixed(2)}</p>
            <button class="btn-add" onclick="addToCart('${p.id}')">Add to Cart</button>
        </div>
    `).join('');
    renderCart();
}

function addToCart(id) {
    const item = PRODUCTS.find(p => p.id === id);
    const existing = cart.find(c => c.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...item, qty: 1 });
    }
    renderCart();
}

function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    renderCart();
}

function renderCart() {
    const container = document.getElementById('cart-items');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (cart.length === 0) {
        container.innerHTML = `<p style="color:#999; text-align:center;">Your cart is empty.</p>`;
        checkoutBtn.disabled = true;
    } else {
        container.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div>
                    <b>${item.name}</b><br>
                    <small>${item.qty} x $${item.price.toFixed(2)}</small>
                    <button class="btn-remove" onclick="removeFromCart('${item.id}')">Remove</button>
                </div>
                <span>$${(item.qty * item.price).toFixed(2)}</span>
            </div>
        `).join('');
        checkoutBtn.disabled = false;
    }

    const sub = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
    document.getElementById('subtotal').textContent = `$${sub.toFixed(2)}`;
    document.getElementById('total').textContent = `$${(sub > 0 ? sub + SHIPPING : 0).toFixed(2)}`;
    document.getElementById('count').textContent = cart.reduce((acc, i) => acc + i.qty, 0);
}

function checkout() {
    const name = document.getElementById('cust-name').value;
    const email = document.getElementById('cust-email').value;

    if (!name || !email.includes('@')) {
        return alert("Please enter your name and a valid email.");
    }

    const orderItems = cart.map(item => `${item.name} (x${item.qty}) - $${(item.qty * item.price).toFixed(2)}`).join('\n');
    const grandTotal = document.getElementById('total').textContent;

    const form = document.getElementById('hidden-form');
    
    // IMPORTANT: Replace the email below with your real email
    form.action = `https://formsubmit.co/nathanwin4fun@gmail,com`; 
    
    form.innerHTML = `
        <input type="text" name="name" value="${name}">
        <input type="email" name="email" value="${email}">
        <input type="hidden" name="Order_Summary" value="${orderItems}">
        <input type="hidden" name="Grand_Total" value="${grandTotal}">
        <input type="hidden" name="_subject" value="New Black Market Order!">
        <input type="hidden" name="_template" value="table">
    `;
    
    alert("Redirecting to secure submission...");
    form.submit();
}

// Start the application
initStore();
