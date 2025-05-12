import React from 'react';
import CartItem from './CartItem';

function Cart({ cartItems, setCart, completeOrder }) {
  const updateQuantity = (index, newQuantity) => {
    const updatedCart = [...cartItems];
    updatedCart[index].quantity = Math.max(0, newQuantity);
    if (updatedCart[index].quantity === 0) {
      updatedCart.splice(index, 1);
    }
    setCart(updatedCart);
  };

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = total * 0.1;
  const grandTotal = total + tax;

  return (
    <div
      style={{
        backgroundColor: '#ffffff',
        padding: '20px',
        borderRadius: '8px',
        border: '1px solid #ddd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <span style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937' }}>
          Your Cart ({cartItems.length})
        </span>
        <button
          style={{
            padding: '5px 10px',
            backgroundColor: '#ef4444',
            color: '#ffffff',
            border: 'none',
            borderRadius: '4px',
            fontSize: '12px',
            cursor: 'pointer',
          }}
        >
          DINE IN
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p style={{ color: '#6B7280', textAlign: 'center' }}>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <CartItem
              key={item.cartId}
              item={item}
              index={index}
              updateQuantity={updateQuantity}
            />
          ))}
          <div style={{ marginTop: '15px', textAlign: 'right', fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>
            Total: <span>Kr {grandTotal.toFixed(2)}</span>
            <div style={{ fontSize: '0.75rem', color: '#666' }}>
              (incl. tax 10% = Kr {tax.toFixed(2)})
            </div>
          </div>
          <button
            onClick={() => completeOrder()}
            style={{
              marginTop: '15px',
              width: '100%',
              padding: '10px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
          >
            PAYMENT
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;