import React from 'react';

function CartItem({ item, index, updateQuantity }) {
  const tax = item.price * item.quantity * 0.1;
  const totalPrice = (item.price * item.quantity) + tax;

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '10px 0',
        borderBottom: '1px solid #ddd',
        fontSize: '14px',
        color: '#1F2937',
      }}
    >
      <span>
        {index + 1}. {item.name}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <button
          onClick={() => updateQuantity(index, item.quantity - 1)}
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
        <span>{item.quantity}</span>
        <button
          onClick={() => updateQuantity(index, item.quantity + 1)}
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
      <div style={{ textAlign: 'right' }}>
        <span>Kr {totalPrice.toFixed(2)}</span>
        <div style={{ fontSize: '0.75rem', color: '#666' }}>
          (incl. tax 10% = Kr {tax.toFixed(2)})
        </div>
      </div>
    </div>
  );
}

export default CartItem;