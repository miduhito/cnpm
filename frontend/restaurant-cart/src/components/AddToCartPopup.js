import React, { useState, useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';

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
    onClose();
  };

  return (
    <div style={{
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#ffffff',
      padding: '15px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      zIndex: 1000,
      width: '90%',
      maxWidth: '400px',
      display: 'flex',
      flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 'bold', color: '#ef4444' }}>ADD TO CART</h2>
        <button
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            fontSize: '18px',
            cursor: 'pointer',
            color: '#000',
          }}
        >
          <FaTimes />
        </button>
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', gap: '10px', marginBottom: '10px' }}>
        <div style={{ flex: '1', minWidth: '120px' }}>
          <img
            src={item.image || 'https://placehold.co/200x150?text=No+Image'}
            alt={item.name}
            style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
          />
        </div>
        <div style={{ flex: '2' }}>
          <p style={{ color: '#6B7280', marginBottom: '4px', fontSize: '14px' }}>SKU: {item.id || 'prod2'}</p>
          <h3 style={{ fontSize: '15px', fontWeight: '600', marginBottom: '4px' }}>{item.name || 'Cola'}</h3>
          <p style={{ color: '#6B7280', marginBottom: '8px', fontSize: '14px' }}>
            Freshly made with premium ingredients
          </p>
          <p style={{ fontSize: '15px', fontWeight: 'bold', color: '#ef4444', marginBottom: '8px' }}>
            Unit Price: Kr {item.price || '1.99'}
          </p>
        </div>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ fontWeight: '500', marginBottom: '4px', display: 'block', color: '#1F2937', fontSize: '14px' }}>
          QUANTITY
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => handleQuantityChange(-1)}
            style={{
              padding: '4px 8px',
              backgroundColor: '#e5e7eb',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            -
          </button>
          <span style={{ fontSize: '14px', fontWeight: 'bold', color: '#000' }}>{quantity}</span>
          <button
            onClick={() => handleQuantityChange(1)}
            style={{
              padding: '4px 8px',
              backgroundColor: '#e5e7eb',
              color: '#000',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '14px',
            }}
          >
            +
          </button>
        </div>
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label style={{ fontWeight: '500', marginBottom: '4px', display: 'block', color: '#1F2937', fontSize: '14px' }}>
          SIDE DISHES (*)
        </label>
        <p style={{ color: '#6B7280', marginBottom: '4px', fontSize: '12px' }}>
          Please select one of the properties below
        </p>
        {item.options && item.options.length > 0 ? (
          item.options.map((option, index) => (
            <label key={index} style={{ display: 'block', marginBottom: '4px' }}>
              <input
                type="checkbox"
                value={JSON.stringify(option)}
                onChange={handleOptionChange}
                style={{ marginRight: '5px', accentColor: '#ef4444' }}
              />
              <span style={{ fontSize: '14px' }}>
                {option.name || 'Extra Ice'} (Selected quantity {selectedOptions.some(opt => opt.name === option.name) ? '1' : '0'})
              </span>
            </label>
          ))
        ) : (
          <p style={{ color: '#6B7280', fontSize: '14px' }}>No side dishes available</p>
        )}
      </div>
      <button
        onClick={handleAddToCart}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#ef4444',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          fontSize: '15px',
          fontWeight: 'bold',
          cursor: 'pointer',
          transition: 'background-color 0.3s',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '5px',
        }}
        onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
      >
        <span>Kr {totalPrice.toFixed(2)}</span>
      </button>
      <style>
        {`
          @media (max-width: 480px) {
            div[style*='maxWidth: 400px'] {
              width: 95%;
            }
            div[style*='flexDirection: row'] {
              flex-direction: column;
            }
            div[style*='flex: 1'] {
              min-width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}

export default AddToCartPopup;