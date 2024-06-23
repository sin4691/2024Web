// 로컬 스토리지에서 장바구니 데이터 불러오기
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// 장바구니 아이템을 제거하는 함수
function removeItem(index) {
    cart.splice(index, 1); // 배열에서 해당 인덱스의 요소 제거
    localStorage.setItem('cart', JSON.stringify(cart)); // 변경된 장바구니 데이터 저장
    renderCart(); // 장바구니 UI 업데이트
}

// 장바구니 UI 렌더링 함수
function renderCart() {
    const cartItems = document.getElementById('cartItems');
    cartItems.innerHTML = ''; // 기존 항목 모두 제거 후 재렌더링

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span>${item.quantity} 개: 상품 ${item.id}</span>
            <button onclick="removeItem(${index})">삭제</button>
        `;
        cartItems.appendChild(li);
    });
}

// 페이지 로드 시 장바구니 UI 초기 렌더링
renderCart();

