import React from 'react';

function CartItem({ item, index, updateQuantity }) {
  const tax = item.price * 0.1;
  const totalPrice = item.price + tax;

  return (
    <div className="cart-item">
      <span>
        {index + 1}. {item.name}
      </span>
      <div className="cart-item-quantity">
        <button onClick={() => updateQuantity(index, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
      </div>
      <span className="cart-item-price">Kr {totalPrice.toFixed(2)}</span>
      <div style={{ fontSize: '0.75rem', color: '#666' }}>
        (incl. tax 10% = Kr {tax.toFixed(2)})
      </div>
    </div>
  );
}

export default CartItem;