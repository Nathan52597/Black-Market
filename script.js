async function checkout() {
    const name = document.getElementById('cust-name').value;
    const email = document.getElementById('cust-email').value;

    if (!name || !email.includes('@')) {
        return alert("請輸入姓名與有效的電子郵件。");
    }

    const orderItems = cart.map(item => `${item.name} (x${item.qty}) - $${(item.qty * item.price).toFixed(2)}`).join('\n');
    const grandTotal = document.getElementById('total').textContent;

    // 準備要傳送的資料物件
    const formData = {
        name: name,
        email: email,
        Order_Summary: orderItems,
        Grand_Total: grandTotal,
        _subject: "來自黑市的新訂單！", // 你可以自定義主旨
        _template: "table"
    };

    // 顯示讀取中狀態 (選配)
    const checkoutBtn = document.getElementById('checkout-btn');
    const originalBtnText = checkoutBtn.innerText;
    checkoutBtn.disabled = true;
    checkoutBtn.innerText = "處理中...";

    try {
        // 使用 /ajax/ 接口來發送請求，這樣就不會跳轉
        const response = await fetch("https://formsubmit.co/ajax/nathanwin4fun@gmail.com", {
            method: "POST",
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            alert("訂單已成功送出！我們將儘快聯絡您。");
            
            // 成功後清空購物車與欄位
            cart = [];
            renderCart();
            document.getElementById('cust-name').value = '';
            document.getElementById('cust-email').value = '';
        } else {
            alert("送出失敗，伺服器回應異常。");
        }
    } catch (error) {
        console.error("Error:", error);
        alert("發生錯誤，請檢查網路連線。");
    } finally {
        // 恢復按鈕狀態
        checkoutBtn.disabled = false;
        checkoutBtn.innerText = originalBtnText;
    }
}
