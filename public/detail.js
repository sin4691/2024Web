// 로컬 스토리지에서 장바구니 데이터를 가져오는 함수
function getCart() {
    const cart = localStorage.getItem('cart');
    return cart ? JSON.parse(cart) : [];
}

// 로컬 스토리지에 장바구니 데이터를 저장하는 함수
function saveCart(cart) {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// 장바구니에 상품을 추가하는 함수
function addToCart(productId) {
    const quantityInput = document.getElementById('quantity');
    const quantity = parseInt(quantityInput.value);

    // 수량이 유효한지 확인
    if (isNaN(quantity) || quantity <= 0) {
        alert('올바른 수량을 입력해주세요.');
        return;
    }

    const cart = getCart();

    // 장바구니에 이미 존재하는 상품인지 확인
    const existingProductIndex = cart.findIndex(item => item.id === productId);

    if (existingProductIndex > -1) {
        // 기존 상품이 있으면 수량을 증가
        cart[existingProductIndex].quantity += quantity;
    } else {
        // 새로운 상품을 추가
        cart.push({ id: productId, quantity });
    }

    saveCart(cart);
    alert('상품이 장바구니에 추가되었습니다.');
}
