import React, { useState } from 'react';

function AddToCartPopup({ item, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [sideDish, setSideDish] = useState('Vegetables');

  const handleAdd = () => {
    onAddToCart(item, quantity, sideDish);
  };

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
          <div style={{ fontSize: '14px', color: '#1F2937' }}>401</div>
          <div style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>{item.name}</div>
          <div style={{ fontSize: '14px', color: '#6B7280' }}>Burger</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: '12px', color: '#6B7280' }}>Unit Price</div>
          <div style={{ fontSize: '16px', fontWeight: '500', color: '#ef4444' }}>
            Kr {item.price}.00
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
      <div style={{ marginBottom: '15px' }}>
        <div style={{ fontSize: '14px', fontWeight: '500', color: '#1F2937', marginBottom: '5px' }}>
          SIDE dishes (*)
        </div>
        <div style={{ fontSize: '12px', color: '#666', marginBottom: '5px' }}>
          Please select one of the properties below
        </div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
          <input
            type="checkbox"
            checked={sideDish === 'Vegetables'}
            onChange={() => setSideDish(sideDish === 'Vegetables' ? '' : 'Vegetables')}
          />
          <span>Vegetables</span>
        </label>
      </div>
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
        onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
        onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
      >
        Kr {item.price * quantity}.00
      </button>
    </div>
  );
}

export default AddToCartPopup;