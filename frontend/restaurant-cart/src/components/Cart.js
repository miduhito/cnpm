import React, { useState, useEffect } from 'react';
import CartItem from './CartItem';

function Cart({ cartItems: initialCartItems, setCart, completeOrder, cartID, addToCart }) {
  const [fetchedCartItems, setFetchedCartItems] = useState(initialCartItems || []);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setFetchedCartItems(initialCartItems || []);
  }, [initialCartItems]);

  useEffect(() => {
    const fetchCart = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`http://localhost:3001/cart/${cartID}`);
        if (!response.ok) {
          if (response.status === 404) {
            await createCart(cartID);
            const newResponse = await fetch(`http://localhost:3001/cart/${cartID}`);
            if (!newResponse.ok) throw new Error('Không thể tải giỏ hàng sau khi tạo');
            const data = await newResponse.json();
            setFetchedCartItems(data.cartItems || []);
            return;
          }
          throw new Error('Không thể tải giỏ hàng');
        }
        const data = await response.json();
        setFetchedCartItems(data.cartItems || []);
      } catch (err) {
        setError('Lỗi khi tải giỏ hàng: ' + err.message);
      } finally {
        setIsLoading(false);
      }
    };

    const createCart = async (cartID) => {
      try {
        const response = await fetch('http://localhost:3001/cart', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ cartID }),
        });
        if (!response.ok) throw new Error('Không thể tạo giỏ hàng');
      } catch (err) {
        console.error('Failed to create cart:', err);
        throw err;
      }
    };

    if (!initialCartItems) fetchCart();
  }, [cartID, initialCartItems]);

  const updateQuantity = async (cartItemID, newQuantity, index) => {
    setIsLoading(true);
    setError(null);
    try {
      let response;
      if (newQuantity <= 0) {
        response = await fetch(`http://localhost:3001/cart-items/${cartItemID}`, {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
        });
      } else {
        response = await fetch(`http://localhost:3001/cart-items/${cartItemID}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ quantity: newQuantity }),
        });
      }
      if (!response.ok) throw new Error('Cập nhật giỏ hàng thất bại');
      const updatedCart = [...fetchedCartItems];
      if (newQuantity <= 0) {
        updatedCart.splice(index, 1);
      } else {
        updatedCart[index].quantity = newQuantity;
      }
      setFetchedCartItems(updatedCart);
      setCart(updatedCart);
    } catch (err) {
      setError('Lỗi: ' + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const total = fetchedCartItems.reduce((sum, item) => sum + (parseFloat(item.unitPrice) + (item.options || []).reduce((optSum, opt) => optSum + parseFloat(opt.price), 0)) * item.quantity, 0);
  const tax = total * 0.1;
  const grandTotal = total + tax;

  return (
    <div style={{ backgroundColor: '#ffffff', padding: '20px', borderRadius: '8px', border: '1px solid #ddd', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <span style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937' }}>Your Cart ({fetchedCartItems.length})</span>
        <button style={{ padding: '5px 10px', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}>DINE IN</button>
      </div>
      {isLoading && <p style={{ color: '#6B7280', textAlign: 'center' }}>Đang tải...</p>}
      {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>}
      {fetchedCartItems.length === 0 && !isLoading && !error && <p style={{ color: '#6B7280', textAlign: 'center' }}>Cart is empty</p>}
      {fetchedCartItems.length > 0 && (
        <>
          {fetchedCartItems.map((item, index) => (
            <CartItem key={item.cartItemID} item={item} index={index} updateQuantity={updateQuantity} />
          ))}
          <div style={{ marginTop: '15px', textAlign: 'right', fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>
            Total: <span>${grandTotal.toFixed(2)}</span>
            <div style={{ fontSize: '0.75rem', color: '#666' }}>(incl. tax 10% = ${tax.toFixed(2)})</div>
          </div>
          <button
            onClick={() => completeOrder(fetchedCartItems)}
            style={{ marginTop: '15px', width: '100%', padding: '10px', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '6px', cursor: 'pointer', transition: 'background-color 0.2s' }}
            onMouseOver={(e) => (e.target.style.backgroundColor = '#dc2626')}
            onMouseOut={(e) => (e.target.style.backgroundColor = '#ef4444')}
          >
            PAYMENT
          </button>
        </>
      )}
    </div>
  );
}

export default Cart;