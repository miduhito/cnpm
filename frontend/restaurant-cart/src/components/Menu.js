import React, { useState } from 'react';
import MenuItem from './MenuItem';
import AddToCartPopup from './AddToCartPopup';
import Cart from './Cart';

function Menu({ menuItems, addToCart, cartItems, completeOrder, role, proceedToPayment }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const handleAddToCart = (item, quantity, sideDish) => {
    const cartItem = { ...item, quantity, sideDish, cartId: Date.now() };
    addToCart(cartItem);
    setSelectedItem(null);
  };

  const setCart = (updatedCart) => {
    const newCart = updatedCart.map(item => ({
      ...item,
      cartId: item.cartId || Date.now(),
    }));
    completeOrder(newCart);
  };

  return (
    <div style={{ marginLeft: '250px', padding: '30px', backgroundColor: '#f3f3f3', minHeight: '100vh', display: 'flex', gap: '20px' }}>
      <div style={{ flex: 3 }}>
        {Object.entries(menuItems).map(([category, items]) => (
          <div key={category}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', marginBottom: '16px' }}>
              {category}
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              {items.map((item, idx) => (
                <MenuItem
                  key={item.id}
                  item={item}
                  index={idx + 1}
                  onItemClick={handleItemClick}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, minWidth: '300px' }}>
        <Cart cartItems={cartItems} setCart={setCart} completeOrder={proceedToPayment} />
      </div>

      {selectedItem && (
        <AddToCartPopup
          item={selectedItem}
          onClose={handleClosePopup}
          onAddToCart={handleAddToCart}
        />
      )}

      <style>
        {`
          @media (max-width: 768px) {
            div[style*='margin-left: 250px'] {
              margin-left: 0;
              width: 100%;
              flex-direction: column;
            }
            div[style*='flex: 1'] {
              min-width: 100%;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Menu;