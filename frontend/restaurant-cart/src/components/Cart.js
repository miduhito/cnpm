import React, { useState } from 'react';
import CartItem from './CartItem';

function Cart({ cartItems, setCart }) {
  const [isDineInActive, setIsDineInActive] = useState(false);

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
    <div className="cart-container">
      <div className="cart-title">
        <span>Your Cart ({cartItems.length})</span>
        <button
          className={`dine-in ${isDineInActive ? 'active' : ''}`}
          onClick={() => setIsDineInActive(!isDineInActive)}
        >
          DINE IN
        </button>
      </div>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <>
          {cartItems.map((item, index) => (
            <CartItem
              key={index}
              item={item}
              index={index}
              updateQuantity={updateQuantity}
            />
          ))}
          <div className="cart-total">
            Total: <span>Kr {grandTotal.toFixed(2)}</span>
            <div className="cart-total-tax">(incl. tax 10% = Kr {tax.toFixed(2)})</div>
          </div>
          <button className="cart-payment">PAYMENT</button>
        </>
      )}
    </div>
  );
}

export default Cart;