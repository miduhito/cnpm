// Cart.js
import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';

function Cart({ cartItems, setCart, completeOrder, cartID }) {
  const [fetchedCartItems, setFetchedCartItems] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3001/cart/${cartID}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched cart items:', data.cartItems);
        setFetchedCartItems(data.cartItems || []);
      })
      .catch((error) => console.error('Error fetching cart:', error));
  }, [cartID, cartItems]);

  const updateQuantity = async (cartItemID, newQuantity, index) => {
    console.log(`Updating cartItemID: ${cartItemID}, newQuantity: ${newQuantity}, index: ${index}`);
    try {
      if (newQuantity <= 0) {
        const response = await fetch(`http://localhost:3001/cart-items/${cartItemID}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`Failed to delete cart item: ${errorData.message || response.statusText}`);
        }

        const updatedCart = [...fetchedCartItems];
        updatedCart.splice(index, 1);
        setCart(updatedCart);
        setFetchedCartItems(updatedCart);
      } else {
        const response = await fetch(`http://localhost:3001/cart-items/${cartItemID}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: newQuantity }),
        });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`Failed to update quantity: ${errorData.message || response.statusText}`);
        }

        const updatedCart = [...fetchedCartItems];
        updatedCart[index].quantity = newQuantity;
        setCart(updatedCart);
        setFetchedCartItems(updatedCart);
      }
    } catch (error) {
      console.error('Error updating cart:', error);
      alert(`Failed to update cart: ${error.message}`);
    }
  };

  const total = fetchedCartItems.reduce(
    (sum, item) =>
      sum +
      (parseFloat(item.unitPrice) +
        (item.options || []).reduce((optSum, opt) => optSum + parseFloat(opt.price), 0)) *
        item.quantity,
    0
  );
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
          Your Cart ({fetchedCartItems.length}) </span>
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
          DINE IN </button> </div>
      {fetchedCartItems.length === 0 ? (
        <p style={{ color: '#6B7280', textAlign: 'center' }}>Cart is empty</p>
      ) : (
        <>
          {fetchedCartItems.map((item, index) => (
            <CartItem
              key={item.cartItemID}
              item={item}
              index={index}
              updateQuantity={updateQuantity}
            />
          ))}
          <div style={{ marginTop: '15px', textAlign: 'right', fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>
            Total: <span>${grandTotal.toFixed(2)}</span>
            <div style={{ fontSize: '0.75rem', color: '#666' }}>
              (incl. tax 10% = ${tax.toFixed(2)}) </div> </div>
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
            onMouseOver={(e) => (e.target.style.backgroundColor = '#dc2626')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#ef4444')}
          >
            PAYMENT </button>
        </>
      )} </div>
  );
}

export default Cart;