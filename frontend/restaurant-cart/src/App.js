import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './components/Login';
import Menu from './components/Menu';
import Dashboard from './components/Dashboard';
import Product from './components/Product';
import User from './components/User';
import Payment from './components/Payment';
import { FaHome, FaUtensils, FaUsers, FaShoppingCart } from 'react-icons/fa';

function App() {
  const [currentPage, setCurrentPage] = useState('menu');
  const [user, setUser] = useState('user');
  const [menuItems, setMenuItems] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [orderId, setOrderId] = useState(1);
  const [cartID, setCartID] = useState(() => {
    const savedCartID = localStorage.getItem('cartID');
    return savedCartID || Date.now().toString();
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/products');
        if (!response.ok) throw new Error('Không thể tải sản phẩm');
        const data = await response.json();
        const formattedMenuItems = data.reduce((acc, product) => {
          const categoryName = product.category.name;
          const menuItem = {
            id: product.productID,
            name: product.name,
            price: parseFloat(product.price),
            image: product.img,
            description: product.description,
            options: product.options.map((opt) => ({
              optionID: opt.optionID,
              name: opt.name,
              price: parseFloat(opt.price),
            })),
            category: { CategoryID: product.category.CategoryID, name: product.category.name },
          };
          if (!acc[categoryName]) acc[categoryName] = [];
          acc[categoryName].push(menuItem);
          return acc;
        }, {});
        setMenuItems(formattedMenuItems);
        setUsers([{ id: 1, name: 'John Doe', email: 'john@example.com', role: 'manager' }, { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'staff' }]);
      } catch (err) {
        setError('Lỗi khi tải sản phẩm: ' + err.message);
      }
    };

    const createCartIfNeeded = async (retries = 3) => {
      for (let i = 0; i < retries; i++) {
        try {
          const response = await fetch(`http://localhost:3001/cart/${cartID}`);
          if (response.status === 404) {
            await new Promise(resolve => setTimeout(resolve, 500));
            const createResponse = await fetch('http://localhost:3001/cart', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ cartID }),
            });
            if (!createResponse.ok) throw new Error('Không thể tạo giỏ hàng: ' + (await createResponse.text()));
            break;
          } else if (response.ok) {
            break;
          }
        } catch (err) {
          if (i === retries - 1) setError('Lỗi khi kiểm tra/tạo giỏ hàng: ' + err.message);
        }
      }
    };

    createCartIfNeeded();
    fetchProducts();
  }, [cartID]);

  const addToCart = async (product) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(`http://localhost:3001/cart/${cartID}/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productID: product.id,
          quantity: 1,
          optionIDs: product.options?.map(opt => opt.optionID) || [],
        }),
      });
      if (!response.ok) throw new Error('Không thể thêm sản phẩm: ' + (await response.text()));
      const newItem = await response.json();
      setCartItems(prev => [...prev, newItem]);
      // Fetch lại giỏ hàng để đồng bộ
      const cartResponse = await fetch(`http://localhost:3001/cart/${cartID}`);
      if (cartResponse.ok) {
        const cartData = await cartResponse.json();
        setCartItems(cartData.cartItems || []);
      }
    } catch (err) {
      setError('Lỗi khi thêm sản phẩm: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const completeOrder = (updatedCart = cartItems) => {
    if (updatedCart.length > 0) {
      setCartItems(updatedCart);
    } else {
      setCartItems([]);
      setOrderId(orderId + 1);
      const newCartID = Date.now().toString();
      setCartID(newCartID);
      localStorage.setItem('cartID', newCartID);
    }
  };

  const proceedToPayment = () => setCurrentPage('payment');

  const addProduct = (category, product) => {
    setMenuItems(prev => ({
      ...prev,
      [category]: prev[category] ? [...prev[category], product] : [product],
    }));
  };

  const deleteProduct = (category, productId) => {
    setMenuItems(prev => ({
      ...prev,
      [category]: prev[category].filter(item => item.id !== productId),
    }));
  };

  const addUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1, role: 'staff' }]);
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(u => u.id !== userId));
  };

  const handlePayment = (paymentDetails) => {
    console.log('Payment processed:', { orderId, cartItems, paymentDetails });
    setCartItems([]);
    setOrderId(orderId + 1);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login': return <Login onLogin={(user) => { setUser(user); setCurrentPage('menu'); }} />;
      case 'menu': return <Menu menuItems={menuItems} addToCart={addToCart} cartItems={cartItems} completeOrder={completeOrder} role={user?.role} proceedToPayment={proceedToPayment} cartID={cartID} isLoading={isLoading} error={error} />;
      case 'dashboard': return user?.role === 'manager' ? <Dashboard menuItems={menuItems} cartItems={cartItems} users={users} /> : <p className="access-denied">Access denied</p>;
      case 'product': return user?.role === 'manager' ? <Product categories={Object.keys(menuItems)} menuItems={menuItems} addProduct={addProduct} deleteProduct={deleteProduct} /> : <p className="access-denied">Access denied</p>;
      case 'user': return user?.role === 'manager' ? <User users={users} addUser={addUser} deleteUser={deleteUser} /> : <p className="access-denied">Access denied</p>;
      case 'payment': return <Payment cartItems={cartItems} total={cartItems.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0) * 1.1} onPay={handlePayment} onBack={() => setCurrentPage('menu')} />;
      default: return <p className="access-denied">Page not found</p>;
    }
  };

  return (
    <div className="app-container">
      {user && currentPage !== 'payment' && (
        <div className="sidebar">
          <div className="sidebar-item" onClick={() => setCurrentPage('menu')}><FaHome className="sidebar-icon" /> Menu</div>
          {user.role === 'manager' && (
            <>
              <div className="sidebar-item" onClick={() => setCurrentPage('dashboard')}><FaUtensils className="sidebar-icon" /> Dashboard</div>
              <div className="sidebar-item" onClick={() => setCurrentPage('product')}><FaShoppingCart className="sidebar-icon" /> Products</div>
              <div className="sidebar-item" onClick={() => setCurrentPage('user')}><FaUsers className="sidebar-icon" /> Users</div>
            </>
          )}
          <div className="sidebar-item" onClick={() => { setUser(null); setCurrentPage('login'); setCartItems([]); }}><FaHome className="sidebar-icon" /> Logout</div>
        </div>
      )}
      <div className="main-content">{renderPage()}</div>
    </div>
  );
}

export default App;