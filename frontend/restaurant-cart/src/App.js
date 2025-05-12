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
  const [currentPage, setCurrentPage] = useState('login');
  const [user, setUser] = useState(null);
  const [menuItems, setMenuItems] = useState({});
  const [cartItems, setCartItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [orderId, setOrderId] = useState(1);

  // Mock data (thay thế dữ liệu từ API)
  useEffect(() => {
    setMenuItems({
      'Sea Food': [
        { id: '1', name: 'Fish', price: 100, image: 'https://placehold.co/200x150' },
        { id: '2', name: 'Shrimp', price: 150, image: 'https://placehold.co/200x150' },
      ],
    });
    setUsers([
      { id: 1, name: 'John Doe', email: 'john@example.com', role: 'manager' },
      { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'staff' },
    ]);
  }, []);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const completeOrder = (updatedCart = cartItems) => {
    if (updatedCart.length > 0) {
      setCartItems(updatedCart);
    } else {
      setCartItems([]);
      setOrderId(orderId + 1);
    }
  };

  const proceedToPayment = () => {
    setCurrentPage('payment');
  };

  const addProduct = (category, product) => {
    setMenuItems((prev) => ({
      ...prev,
      [category]: prev[category] ? [...prev[category], product] : [product],
    }));
  };

  const deleteProduct = (category, productId) => {
    setMenuItems((prev) => ({
      ...prev,
      [category]: prev[category].filter((item) => item.id !== productId),
    }));
  };

  const addUser = (newUser) => {
    setUsers([...users, { ...newUser, id: users.length + 1, role: 'staff' }]);
  };

  const deleteUser = (userId) => {
    setUsers(users.filter((u) => u.id !== userId));
  };

  const handlePayment = (paymentDetails) => {
    console.log('Payment processed:', { orderId, cartItems, paymentDetails });
    alert(`Order ${orderId} has been paid successfully!`);
    setCartItems([]);
    setOrderId(orderId + 1);
    setCurrentPage('menu');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'login':
        return <Login onLogin={(user) => { setUser(user); setCurrentPage('menu'); }} />;
      case 'menu':
        return (
          <Menu
            menuItems={menuItems}
            addToCart={addToCart}
            cartItems={cartItems}
            completeOrder={completeOrder}
            role={user?.role}
            proceedToPayment={proceedToPayment}
          />
        );
      case 'dashboard':
        return user?.role === 'manager' ? (
          <Dashboard menuItems={menuItems} cartItems={cartItems} users={users} />
        ) : (
          <p style={{ marginLeft: '250px', padding: '30px', color: '#ef4444' }}>Access denied</p>
        );
      case 'product':
        return user?.role === 'manager' ? (
          <Product
            categories={Object.keys(menuItems)}
            menuItems={menuItems}
            addProduct={addProduct}
            deleteProduct={deleteProduct}
          />
        ) : (
          <p style={{ marginLeft: '250px', padding: '30px', color: '#ef4444' }}>Access denied</p>
        );
      case 'user':
        return user?.role === 'manager' ? (
          <User users={users} addUser={addUser} deleteUser={deleteUser} />
        ) : (
          <p style={{ marginLeft: '250px', padding: '30px', color: '#ef4444' }}>Access denied</p>
        );
      case 'payment':
        return (
          <Payment
            cartItems={cartItems}
            total={cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0) * 1.1} // Bao gồm thuế 10%
            onPay={handlePayment}
            onBack={() => setCurrentPage('menu')}
          />
        );
      default:
        return <p style={{ marginLeft: '250px', padding: '30px', color: '#ef4444' }}>Page not found</p>;
    }
  };

  return (
    <div className="app-container">
      {user && currentPage !== 'payment' && (
        <div className="sidebar">
          <div
            className="sidebar-item"
            onClick={() => setCurrentPage('menu')}
          >
            <FaHome className="sidebar-icon" /> Menu
          </div>
          {user.role === 'manager' && (
            <>
              <div
                className="sidebar-item"
                onClick={() => setCurrentPage('dashboard')}
              >
                <FaUtensils className="sidebar-icon" /> Dashboard
              </div>
              <div
                className="sidebar-item"
                onClick={() => setCurrentPage('product')}
              >
                <FaShoppingCart className="sidebar-icon" /> Products
              </div>
              <div
                className="sidebar-item"
                onClick={() => setCurrentPage('user')}
              >
                <FaUsers className="sidebar-icon" /> Users
              </div>
            </>
          )}
          <div
            className="sidebar-item"
            onClick={() => {
              setUser(null);
              setCurrentPage('login');
              setCartItems([]);
            }}
          >
            <FaHome className="sidebar-icon" /> Logout
          </div>
        </div>
      )}
      <div className="main-content">{renderPage()}</div>
    </div>
  );
}

export default App;