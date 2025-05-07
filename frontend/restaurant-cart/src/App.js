import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import Cart from './components/Cart';
import './App.css';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { FaHome } from 'react-icons/fa';
import Payment from './components/Payment';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  const [cart, setCart] = useState([]);
  const [products,setProducts]=useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  useEffect(() => {
    axios.get('http://localhost:3001/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi tải sản phẩm:', error);
      });
  }, []);
  useEffect(() => {
    const existingCartID = localStorage.getItem('cartID');
    if (!existingCartID) {
      axios.post('http://localhost:3001/cart', { cartID: uuidv4() })
        .then(res => {
          localStorage.setItem('cartID', res.data.cartID);
        })
        .catch(err => console.error(err));
    }
  }, []);
  const categories = [
    { name: 'Burger', image: './images/hamburger.jpg' },
    { name: 'Drink', image: '/images/coca.jpg' },
    { name: 'Cupcake',image: '/images/cupcake.jpg'},
    // Thêm các danh mục khác nếu cần
  ];

  const menuItems = selectedCategory === '' 
    ? products 
    : products.filter(product => product.category.name === selectedCategory);

    const addToCart = async (item, quantity, sideDishes) => {
      const cartID = localStorage.getItem('cartID');  // lấy cartID từ localStorage
      const unitPrice = item.price;  // Bạn có thể thay thế theo logic tính giá sản phẩm.
      const newItem = { ...item, quantity, sideDishes };
      setCart([...cart, newItem]);
      const newCartItem = {
        cartID,
        productID: item.productID,  // Tạo request với productID của item
        quantity,
        unitPrice,
        sideDishes
  };

  try {
    const response = await axios.post('http://localhost:3001/cart-items', newCartItem);
    console.log('Sản phẩm đã được thêm vào giỏ:', response.data);
    // Thực hiện thêm sản phẩm vào giỏ hàng trên frontend (cập nhật UI)
    setCart(prevCart => [...prevCart, response.data]);
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm vào giỏ:', error.response ? error.response.data : error.message);
  }
};

return (
  <Router>
    <div className="container mt-4">
      <div className="back-to-home" style={{ width: '100%' }}>
        <FaHome className="back-to-home-icon" />
        <span className="back-to-home-text">Back to home</span>
      </div>

      <Routes>
        <Route path="/" element={
          <div className="category-selector">
            <button
              className={`category-button ${selectedCategory === '' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('')}
            >
              <span>ㅤAllㅤ</span>
            </button>
            {categories.map((category) => (
              <button
                key={category.name}
                className={`category-button ${selectedCategory === category.name ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category.name)}
              >
                <img src={category.image} alt={category.name} />
                <span>{category.name}</span>
              </button>
            ))}
          </div>
        } />
        <Route path="/payment" element={<Payment/>} />
      </Routes>

      <div className="row">
        <div className="col-md-8">
          <Menu items={menuItems} addToCart={addToCart} category={selectedCategory} />
        </div>
        <div className="col-md-4">
          <Cart cartItems={cart} setCart={setCart} />
        </div>
      </div>
    </div>
  </Router>
);
}

export default App;