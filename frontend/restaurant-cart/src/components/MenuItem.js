import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

function MenuItem({ item, index, onItemClick, onAddToCart }) {
  const handleItemClick = (e) => {
    e.stopPropagation();
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({ ...item, quantity: 1, sideDish: 'Vegetables' });
    }
  };

  return (
    <div
      onClick={handleItemClick}
      style={{
        backgroundColor: '#ffffff',
        padding: '15px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <img
        src={item.image}
        alt={item.name}
        style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h5 style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>
            {index}. {item.name}
          </h5>
          <p style={{ fontSize: '14px', color: '#6B7280' }}>Kr {item.price}.00</p>
        </div>
        <FaShoppingCart
          onClick={handleAddToCart}
          style={{ fontSize: '20px', color: '#ef4444', cursor: 'pointer' }}
        />
      </div>
    </div>
  );
}

export default MenuItem;