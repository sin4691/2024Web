const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// EJS를 view engine으로 설정
app.set('view engine', 'ejs');

// 정적 파일 제공 설정 (public 폴더)
app.use(express.static(path.join(__dirname, 'public')));


app.use(express.static('public', {
  setHeaders: (res, path) => {
    if (path.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
    }
  },
}));


// 예시 상품 데이터
const products = [
    { id: 1, name: '골지 올인원', price: 32000, image: '골지 올인원.jpg', category: 'all-in-one' },
    { id: 2, name: '코듀로이 오버롤즈', price: 29000, image: '코듀로이 오버롤즈.jpg', category: 'all-in-one' },

    { id: 3, name: '셜록체크 무스탕', price: 32000, image: '셜록체크 무스탕.jpg', category: 'outer' },
    { id: 4, name: '체크떡볶이', price: 52000, image: '체크떡볶이.jpg', category: 'outer' },
    { id: 5, name: '코쿤펫 아기곰 패딩', price: 49000, image: '코쿤펫 아기곰 패딩.jpg', category: 'outer' },

    { id: 6, name: '코쿤펫 에어로히트 터틀넥', price: 32000, image: '코쿤펫 에어로히트 터틀넥.jpg', category: 'top' },
    { id: 7, name: '마카롱 터틀넥', price: 28000, image: '마카롱 터틀넥.jpg', category: 'top' },
    { id: 8, name: '세일러 카라 티셔츠', price: 22000, image: '세일러 카라 티셔츠.jpg', category: 'top' },
    { id: 9, name: '스프라이트 베이직 티셔츠', price: 16000, image: '스프라이트 베이직 티셔츠.jpg', category: 'top' },
   
    { id: 10, name: '골지폴라원피스', price:34000, image: '골지폴라원피스.jpg', category: 'onepiece' }
];

// 장바구니 배열
let cart = [];

// 루트 경로 라우트
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'main.html'));
});

// 상품 목록 라우트
app.get('/products', (req, res) => {
    res.render('products', { products });
});

app.get('/login', (req, res) => {
    res.render('login');
});

// 상품 목록 라우트 (JSON 형식으로 응답)
app.get('/products', (req, res) => {
    res.json(products);
});

app.get('/mypage', (req, res) => {
    res.render('mypage');
});
// 특정 상품 상세 페이지 라우트
app.get('/products/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
        res.render('productDetail', { product });
    } else {
        res.status(404).send('Product not found');
    }
});

// 장바구니에 상품 추가하는 라우트
app.post('/cart/add/:id', (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);  // 장바구니에 상품 추가
        res.redirect('/cart');  // 장바구니 페이지로 리다이렉트
    } else {
        res.status(404).send('Product not found');
    }
});

// 장바구니 페이지 라우트
app.get('/cart', (req, res) => {
    res.render('cart', { cart });
});

// 서버 시작
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
