import React, { useState } from 'react';

function AddToCartPopup({ item, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleOptionChange = (option) => {
    if (selectedOptions.some((opt) => opt.optionID === option.optionID)) {
      setSelectedOptions(selectedOptions.filter((opt) => opt.optionID !== option.optionID));
    } else {
      setSelectedOptions([...selectedOptions, option]);
    }
  };

  const handleAdd = () => {
    onAddToCart(item, quantity, selectedOptions);
  };

  const totalPrice =
    parseFloat(item.price) +
    selectedOptions.reduce((sum, opt) => sum + parseFloat(opt.price), 0);

  return (
    <div
      style={{
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
        maxWidth: '500px',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h5 style={{ fontSize: '18px', fontWeight: 'bold', color: '#ef4444' }}>ADD TO CART</h5>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', fontSize: '20px', cursor: 'pointer' }}
        >
          ×
        </button>
      </div>
      <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
        <img
          src={item.image}
          alt={item.name}
          style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
        />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: '12px', color: '#6B7280' }}>SKU</div>
          <div style={{ fontSize: '14px', color: '#1F2937' }}>{item.id}</div>
          <div style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>{item.name}</div>
          <div style={{ fontSize: '14px', color: '#6B7280' }}>
            {item.category && item.category.name ? item.category.name : 'Unknown'}
          </div>
          <div style={{ fontSize: '14px', color: '#6B7280', marginTop: '5px' }}>{item.description}</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#6B7280' }}>Unit Price</div>
          <div style={{ fontSize: '16px', fontWeight: '500', color: '#ef4444' }}>
            ${parseFloat(item.price).toFixed(2)}
          </div>
        </div>
      </div>
      <div style={{ marginBottom: '15px' }}>
        <span style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937' }}>Quantity</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '5px' }}>
          <button
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity <= 1}
            style={{
              padding: '2px 8px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            onClick={() => setQuantity(quantity + 1)}
            style={{
              padding: '2px 8px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            +
          </button>
        </div>
      </div>
      {item.options && item.options.length > 0 && (
        <div style={{ marginBottom: '15px' }}>
          <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937', marginBottom: '5px' }}>
            Options
          </div>
          <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
            Select additional options
          </div>
          {item.options.map((option) => (
            <label key={option.optionID} style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
              <input
                type="checkbox"
                checked={selectedOptions.some((opt) => opt.optionID === option.optionID)}
                onChange={() => handleOptionChange(option)}
              />
              <span>
                {option.name} (+${parseFloat(option.price).toFixed(2)})
              </span>
            </label>
          ))}
        </div>
      )}
      <button
        onClick={handleAdd}
        style={{
          width: '100%',
          padding: '10px',
          backgroundColor: '#ef4444',
          color: '#ffffff',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          transition: 'background-color 0.2s',
          fontSize: '16px',
          fontWeight: '500',
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#dc2626')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#ef4444')}
      >
        ${(totalPrice * quantity).toFixed(2)}
      </button>
    </div>
  );
}

export default AddToCartPopup;