<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Black Market | Sports Collectibles</title>
    <style>
        :root {
            --primary: #ff9900;
            --primary-hover: #e68a00;
            --secondary: #232f3e;
            --bg-light: #f8f9fa;
            --text-dark: #1a1a1a;
            --accent-red: #B12704;
            --border-color: #ddd;
            --shadow: 0 4px 12px rgba(0,0,0,0.08);
        }

        * { box-sizing: border-box; }

        body { 
            font-family: 'Segoe UI', system-ui, -apple-system, sans-serif; 
            margin: 0; 
            background-color: var(--bg-light); 
            color: var(--text-dark);
        }

        header { 
            background: var(--secondary); 
            color: white; 
            padding: 1.5rem; 
            text-align: center; 
            position: sticky;
            top: 0;
            z-index: 100;
        }

        header h1 { margin: 0; letter-spacing: 1px; font-weight: 300; }
        header b { color: var(--primary); font-weight: 800; }

        .container { 
            max-width: 1200px; 
            margin: 2rem auto; 
            padding: 0 20px; 
            display: grid;
            grid-template-columns: 1fr 350px;
            gap: 30px;
        }

        @media (max-width: 900px) {
            .container { grid-template-columns: 1fr; }
            #sidebar-cart { position: static; }
        }

        #products { 
            display: grid; 
            grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
            gap: 20px; 
        }

        .product-card { 
            background: white; 
            padding: 20px; 
            border-radius: 8px; 
            box-shadow: var(--shadow);
            display: flex; 
            flex-direction: column;
            transition: transform 0.2s;
        }

        .product-card:hover { transform: translateY(-5px); }

        .product-card img { 
            width: 100%; 
            height: 200px; 
            object-fit: contain; 
            margin-bottom: 15px;
        }

        .product-card h3 { font-size: 1rem; margin: 0 0 10px 0; height: 3rem; overflow: hidden; }
        .price { font-size: 1.4rem; font-weight: bold; color: var(--accent-red); margin: 5px 0; }
        .rating { color: var(--primary); font-size: 0.85rem; }

        button { 
            cursor: pointer; 
            border: none; 
            border-radius: 4px; 
            font-weight: 600; 
            transition: 0.2s;
        }

        .btn-add { 
            background: var(--primary); 
            padding: 10px; 
            width: 100%; 
            margin-top: auto;
        }
        .btn-add:hover { background: var(--primary-hover); }

        #sidebar-cart { 
            background: white; 
            padding: 25px; 
            border-radius: 8px; 
            box-shadow: var(--shadow);
            height: fit-content;
            position: sticky;
            top: 100px;
        }

        .cart-item {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 10px 0;
            border-bottom: 1px solid #eee;
            font-size: 0.9rem;
        }

        .btn-remove {
            background: none;
            color: #999;
            font-size: 0.7rem;
            text-decoration: underline;
        }
        .btn-remove:hover { color: var(--accent-red); }

        .summary-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .total-row { 
            border-top: 2px solid #eee; 
            padding-top: 15px; 
            font-weight: bold; 
            font-size: 1.2rem; 
            color: var(--accent-red);
        }

        .checkout-input {
            width: 100%;
            padding: 12px;
            margin: 8px 0;
            border: 1px solid var(--border-color);
            border-radius: 4px;
        }

        .btn-checkout {
            width: 100%;
            padding: 15px;
            background: #2ecc71;
            color: white;
            font-size: 1rem;
            margin-top: 10px;
        }
        .btn-checkout:hover { background: #27ae60; }
        .btn-checkout:disabled { background: #ccc; cursor: not-allowed; }
    </style>
</head>
<body>

    <header>
        <h1>THE <b>BLACK MARKET</b></h1>
    </header>

    <div class="container">
        <main>
            <h2 style="margin-top: 0;">PokeStore</h2>
            <div id="products"></div>
        </main>

        <aside id="sidebar-cart">
            <h2 style="margin-top:0">Your Cart (<span id="count">0</span>)</h2>
            <div id="cart-items"></div>
            
            <div class="summary-row" style="margin-top: 20px;">
                <span>Subtotal</span>
                <span id="subtotal">$0.00</span>
            </div>
            <div class="summary-row">
                <span>Shipping</span>
                <span id="shipping">$5.00</span>
            </div>
            <div class="summary-row total-row">
                <span>Total</span>
                <span id="total">$5.00</span>
            </div>

            <div style="margin-top: 20px;">
                <input type="text" id="cust-name" class="checkout-input" placeholder="Full Name" required>
                <input type="email" id="cust-email" class="checkout-input" placeholder="Email for receipt" required>
                <button class="btn-checkout" onclick="checkout()" id="checkout-btn">Complete Purchase</button>
            </div>
            
            <form id="hidden-form" method="POST" style="display:none;"></form>
        </aside>
    </div>

    <script>
        const PRODUCTS = [
            { id: 'Pokemon Card Package', name: 'Greninja Ex', price: NT$ 200.00, rating: 5, reviews: 2450, img: 'https://img.shoplineapp.com/media/image_clips/69a15853a25d93d7bffac67a/original.jpg?1772181587=&owner_id=55c37526e37ec6fc5d000002' },
            { id: 'Pokemon Card Package', name: 'Dragonite Ex', price: NT$ 200.00, rating: 5, reviews: 1120, img: 'https://down-tw.img.susercontent.com/file/tw-11134207-81ztf-mi9knne675z4e0' },
            { id: 'Pokemon Card Package', name: 'Zygarde Ex', price: NT$ 200.00, rating: 4, reviews: 450, img: 'https://cs-a.ecimg.tw/items/DGCQ39A900JMM4E/000007_1767934277.jpg' },
            { id: 'Pokemon Card Package', name: 'Zekrom ＆ Reshiram Ex', price: NT$ 400.00, rating: 5, reviews: 890, img: 'https://cs-d.ecimg.tw/items/DGBJQ9A900IX3MT/000002_1749536689.jpg' }
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

            // Create a readable summary of the cart
            const orderItems = cart.map(item => `${item.name} (x${item.qty}) - $${(item.qty * item.price).toFixed(2)}`).join('\n');
            const grandTotal = document.getElementById('total').textContent;

            const form = document.getElementById('hidden-form');
            
            // IMPORTANT: Replace the email below with your real email
            form.action = `https://formsubmit.co/your@email.com`; 
            
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

        initStore();
    </script>
</body>
</html>
