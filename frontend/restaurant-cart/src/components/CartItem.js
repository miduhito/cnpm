import React from 'react';

function CartItem({ item, index, updateQuantity }) {
  const totalPrice = parseFloat(item.unitPrice) * item.quantity;
  const tax = totalPrice * 0.1;
  const grandTotal = totalPrice + tax;

  return (
    <div className="cart-item">
      <span>
        {index + 1}. {item.product.name}
        {item.options?.length > 0 && (
          <div style={{ fontSize: '0.75rem', color: '#666' }}>
            Options: {item.options.map((opt) => opt.name).join(', ')}
          </div>
        )}
      </span>
      <div className="cart-item-quantity">
        <button onClick={() => updateQuantity(index, item.quantity - 1)}>-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateQuantity(index, item.quantity + 1)}>+</button>
      </div>
      <span className="cart-item-price">Kr {grandTotal.toFixed(2)}</span>
      <div style={{ fontSize: '0.75rem', color: '#666' }}>
        (incl. tax 10% = Kr {tax.toFixed(2)})
      </div>
    </div>
  );
}

export default CartItem;