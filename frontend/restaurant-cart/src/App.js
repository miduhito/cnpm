import React, { useState, useEffect } from 'react';
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
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:3001/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Lỗi khi tải sản phẩm:', error);
      });
  }, []);

  useEffect(() => {
    const existingCartID = localStorage.getItem('cartID');
    if (!existingCartID) {
      axios
        .post('http://localhost:3001/cart', { cartID: uuidv4() })
        .then((res) => {
          localStorage.setItem('cartID', res.data.cartID);
          setCart([]);
        })
        .catch((err) => console.error('Lỗi khi tạo giỏ hàng:', err));
    } else {
      fetchCartItems(existingCartID);
    }
  }, []);

  const fetchCartItems = async (cartID) => {
    try {
      const response = await axios.get(`http://localhost:3001/cart/${cartID}`);
      setCart(response.data.cartItems || []);
    } catch (error) {
      if (error.response?.status === 404) {
        localStorage.removeItem('cartID');
        axios
          .post('http://localhost:3001/cart', { cartID: uuidv4() })
          .then((res) => {
            localStorage.setItem('cartID', res.data.cartID);
            setCart([]);
          })
          .catch((err) => console.error('Lỗi khi tạo giỏ hàng mới:', err));
      } else {
        console.error('Lỗi khi tải giỏ hàng:', error);
      }
    }
  };

  const categories = [
    { name: 'Burger', image: './images/hamburger.jpg' },
    { name: 'Drink', image: '/images/coca.jpg' },
    { name: 'Cupcake', image: '/images/cupcake.jpg' },
  ];

  const menuItems =
    selectedCategory === ''
      ? products
      : products.filter((product) => product.category.name === selectedCategory);

  const addToCart = async (item, quantity, optionIDs) => {
    const cartID = localStorage.getItem('cartID');
    if (!cartID) {
      console.error('CartID not found');
      return;
    }

    const newItem = {
      product: {
        productID: item.productID,
        name: item.name,
        price: item.price,
        description: item.description,
        img: item.img,
        quantity: item.quantity,
      },
      quantity,
      options: optionIDs.map((id) => {
        const opt = item.options?.find((o) => o.optionID === id) || {};
        return {
          optionID: id,
          name: opt.name || 'Unknown',
          price: opt.price || 0,
        };
      }),
      unitPrice: parseFloat(item.price) + (optionIDs.reduce((sum, id) => {
        const opt = item.options?.find((o) => o.optionID === id);
        return sum + (opt ? parseFloat(opt.price) : 0);
      }, 0)),
    };
    setCart((prevCart) => [...prevCart, newItem]);

    try {
      const response = await axios.post(`http://localhost:3001/cart/${cartID}/add`, {
        productID: item.productID,
        quantity,
        optionIDs: optionIDs || [],
      });

      setCart((prevCart) => {
        const existingItemIndex = prevCart.findIndex(
          (cartItem) =>
            cartItem.product.productID === response.data.product.productID &&
            JSON.stringify(cartItem.options.map((opt) => opt.optionID).sort()) ===
              JSON.stringify(response.data.options.map((opt) => opt.optionID).sort())
        );

        const updatedCart = [...prevCart.slice(0, -1)];
        if (existingItemIndex !== -1 && existingItemIndex < updatedCart.length) {
          updatedCart[existingItemIndex].quantity += quantity;
          updatedCart[existingItemIndex].cartItemID = response.data.cartItemID;
          updatedCart[existingItemIndex].unitPrice = response.data.unitPrice;
          updatedCart[existingItemIndex].options = response.data.options;
        } else {
          updatedCart.push(response.data);
        }
        return updatedCart;
      });
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ:', error.response ? error.response.data : error.message);
      setCart((prevCart) => prevCart.slice(0, -1));
    }
  };

  return (
    <Router>
      <div className="container mt-4">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <div className="back-to-home" style={{ width: '100%' }}>
                  <FaHome className="back-to-home-icon" />
                  <span className="back-to-home-text">Back to home</span>
                </div>
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
                <div className="row">
                  <div className="col-md-8">
                    <Menu items={menuItems} addToCart={addToCart} category={selectedCategory} />
                  </div>
                  <div className="col-md-4">
                    <Cart cartItems={cart} setCart={setCart} />
                  </div>
                </div>
              </>
            }
          />
          <Route path="/payment" element={<Payment cartItems={cart} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;