import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Menu from './components/Menu';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [cart, setCart] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('Sea Food');

  const categories = [
    { name: 'Cupcake', image: '/images/hamburger.jpg' },
    { name: 'Sea Food', image: '/images/hamburger.jpg' },
    { name: 'Juice', image: '/images/hamburger.jpg' },
    { name: 'Coca', image: '/images/hamburger.jpg' },
    { name: 'Orange Juice', image: '/images/hamburger.jpg' },
  ];

  const menuItems = {
    'Cupcake': [
      { id: 1, name: 'Chocolate Cupcake', price: 50, image: '/images/hamburger.jpg' },
      { id: 2, name: 'Vanilla Cupcake', price: 50, image: '/images/hamburger.jpg' },
    ],
    'Sea Food': [
      { id: 1, name: 'Hamburger', price: 123, image: '/images/hamburger.jpg' },
      { id: 2, name: 'Grilled Squid Satay', price: 123, image: '/images/hamburger.jpg' },
      { id: 3, name: 'Grilled Squid Satay', price: 123, image: '/images/hamburger.jpg' },
      { id: 4, name: 'Grilled Squid Satay', price: 123, image: '/images/hamburger.jpg' },
      { id: 5, name: 'Grilled Squid Satay', price: 123, image: '/images/hamburger.jpg' },
      { id: 6, name: 'Grilled Squid Satay', price: 123, image: '/images/hamburger.jpg' },
    ],
    'Juice': [
      { id: 1, name: 'Apple Juice', price: 30, image: '/images/hamburger.jpg' },
      { id: 2, name: 'Mango Juice', price: 30, image: '/images/hamburger.jpg' },
    ],
    'Coca': [
      { id: 1, name: 'Coca Cola', price: 20, image: '/images/hamburger.jpg' },
    ],
    'Orange Juice': [
      { id: 1, name: 'Fresh Orange Juice', price: 35, image: '/images/hamburger.jpg' },
    ],
  };

  const addToCart = (item, quantity, sideDish) => {
    setCart([...cart, { ...item, quantity, sideDish }]);
  };

  return (
    <div className="container mt-4">
      <div className="back-to-home">
        <span className="back-to-home-icon">🏠</span>
        <span>Back to home</span>
      </div>
      <h1>Restaurant Menu</h1>
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
          <Menu items={menuItems[selectedCategory]} addToCart={addToCart} category={selectedCategory} />
        </div>
        <div className="col-md-4">
          <Cart cartItems={cart} setCart={setCart} />
        </div>
      </div>
    </div>
  );
}

export default App;