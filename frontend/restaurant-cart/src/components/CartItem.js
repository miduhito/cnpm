import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

function CartItem({ item, index, updateQuantity }) {
  const optionTotal = (item.options || []).reduce((sum, opt) => sum + parseFloat(opt.price), 0);
  const basePrice = parseFloat(item.unitPrice);
  const tax = basePrice * item.quantity * 0.1;
  const totalPrice = basePrice * item.quantity + tax;

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid #ddd', fontSize: '14px', color: '#1F2937' }}>
      <span>
        {index + 1}. {item.product.name}
        {item.options && item.options.length > 0 && (
          <div style={{ fontSize: '12px', color: '#6B7280' }}>Options: {item.options.map(opt => opt.name).join(', ')}</div>
        )}
      </span>
      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
        <button onClick={() => updateQuantity(item.cartItemID, item.quantity - 1, index)} style={{ padding: '2px 8px', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(item.cartItemID, item.quantity + 1, index)} style={{ padding: '2px 8px', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>+</button>
      </div>
      <div style={{ textAlign: 'right' }}>
        <span>${totalPrice.toFixed(2)}</span>
        <div style={{ fontSize: '0.75rem', color: '#666' }}>(incl. tax 10% = ${tax.toFixed(2)})</div>
      </div>
    </div>
  );
}

export default CartItem;