import React, { useState,useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import Cart from './components/Cart';
import './App.css';
import axios from 'axios';
import { FaHome } from 'react-icons/fa';

function App() {
  const [cart, setCart] = useState([]);
  const [products,setProducts]=useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Burger');
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
    // Lấy dữ liệu sản phẩm từ localStorage
    const storedProducts = JSON.parse(localStorage.getItem('products')) || [];
    setProducts(storedProducts);
  }, []);

  const categories = [
    { name: 'Burger', image: './images/hamburger.jpg' },
    { name: 'Drink', image: '/images/coca.jpg' },
    { name: 'Cupcake',image: '/images/cupcake.jpg'},
    // Thêm các danh mục khác nếu cần
  ];

  const menuItems = products.filter(product => product.category.name === selectedCategory);

  const addToCart = (item, quantity, sideDishes) => {
    setCart([...cart, { ...item, quantity, sideDishes }]);
  };

  return (
    <div className="container mt-4">
      <div className="back-to-home" style={{ width: '100%' }}>
        <FaHome className="back-to-home-icon" />
        <span className="back-to-home-text">Back to home</span>
      </div>
      <h1 className="restaurant-menu-title">Restaurant Menu</h1>
      <div className="category-selector">
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
      <div className="row">
        <div className="col-md-8">
          <Menu items={menuItems} addToCart={addToCart} category={selectedCategory} />
        </div>
        <div className="col-md-4">
          <Cart cartItems={cart} setCart={setCart} />
        </div>
      </div>
    </div>
  );
}

export default App;