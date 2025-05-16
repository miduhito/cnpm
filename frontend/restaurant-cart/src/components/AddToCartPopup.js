import React, { useState, useEffect } from 'react';
import { FaShoppingCart, FaTimes } from 'react-icons/fa';

function AddToCartPopup({ item, onClose, onAddToCart, proceedToPayment }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [totalPrice, setTotalPrice] = useState(item.price || 0);

  useEffect(() => {
    let newTotal = item.price || 0;
    selectedOptions.forEach((opt) => {
      newTotal += parseFloat(opt.price || 0);
    });
    setTotalPrice(newTotal * quantity);
  }, [selectedOptions, quantity, item.price]);

  const handleQuantityChange = (delta) => {
    setQuantity(Math.max(1, quantity + delta));
  };

  const handleOptionChange = (e) => {
    const option = JSON.parse(e.target.value);
    setSelectedOptions((prev) =>
      prev.some((opt) => opt.name === option.name)
        ? prev.filter((opt) => opt.name !== option.name)
        : [...prev, option]
    );
  };

  const handleAddToCart = () => {
    onAddToCart(item, quantity, selectedOptions);
    alert('Đã thêm vào giỏ hàng!');
    onClose();
  };

  const handleProceedToPayment = () => {
    onClose();
    proceedToPayment(); // Sử dụng prop proceedToPayment thay vì window.location.href
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#ffffff',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      width: '90%',
      maxWidth: '400px',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ef4444' }}>ADD TO CART</h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '20px',
            cursor: 'pointer',
            color: '#000',
          }}
        >
          <FaTimes />
        </button>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <img
          src={item.image || 'https://placehold.co/200x150?text=No+Image'}
          alt={item.name}
          style={{ width: '100%', height: 'auto', borderRadius: '4px', marginBottom: '10px' }}
        />
        <p style={{ color: '#6B7280', marginBottom: '5px' }}>SKU: {item.id || 'prod2'}</p>
        <h3 style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px' }}>{item.name || 'Beef Burger'}</h3>
        <p style={{ color: '#6B7280', marginBottom: '10px' }}>{item.description || 'Juicy beef patty'}</p>
        <p style={{ fontSize: '16px', fontWeight: 'bold', color: '#ef4444', marginBottom: '10px' }}>
          Unit Price: ${item.price || '6.99'}
        </p>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: '500', marginBottom: '5px', display: 'block', color: '#1F2937' }}>Quantity</label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => handleQuantityChange(-1)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
          >
            -
          </button>
          <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#ef4444' }}>{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
          >
            +
          </button>
        </div>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <label style={{ fontWeight: '500', marginBottom: '5px', display: 'block', color: '#1F2937' }}>Options</label>
        <p style={{ color: '#6B7280', marginBottom: '5px' }}>Select additional options</p>
        {item.options && item.options.length > 0 ? (
          item.options.map((option, index) => (
            <label key={index} style={{ display: 'block', marginBottom: '5px' }}>
              <input
                type="checkbox"
                value={JSON.stringify(option)}
                onChange={handleOptionChange}
                style={{ marginRight: '5px' }}
              />
              {option.name || 'Large Size'} (+${option.price || '2.50'})
            </label>
          ))
        ) : (
          <p style={{ color: '#6B7280' }}>No options available</p>
        )}
      </div>
      <div style={{ marginBottom: '20px' }}>
        <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#ef4444', marginBottom: '10px' }}>
          ${totalPrice.toFixed(2)}
        </p>
      </div>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button
          onClick={handleProceedToPayment}
          style={{
            flex: 2,
            padding: '12px',
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            fontWeight: 'bold',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
        >
          ${totalPrice.toFixed(2)}
        </button>
        <button
          onClick={handleAddToCart}
          style={{
            flex: 1,
            padding: '12px',
            backgroundColor: '#28a745',
            color: '#ffffff',
            border: 'none',
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '5px',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
        >
          <FaShoppingCart /> Add to Cart
        </button>
      </div>
      <style>
        {`
          @media (max-width: 480px) {
            div[style*='display: flex'][style*='gap: 10px'] {
              flex-direction: column;
            }
            button[style*='flex: 2'], button[style*='flex: 1'] {
              flex: 100%;
              width: 100%;
              margin-bottom: 10px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default AddToCartPopup;