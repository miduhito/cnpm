import React, { useState } from 'react';
import MenuItem from './MenuItem';
import AddToCartPopup from './AddToCartPopup';

function Menu({ items, addToCart, category }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  const handleAddToCart = (item, quantity, optionIDs) => {
    addToCart(item, quantity, optionIDs);
    setSelectedItem(null);
  };

  if (!Array.isArray(items) || items.length === 0) {
    return <p className="text-center">No items available in this category</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{category || 'Menu'}</h2>
      <div className="row">
        {items.map((item, idx) => (
          <div className="col-12 col-md-4 mb-4" key={item.productID || idx}>
            <MenuItem
              item={item}
              index={idx + 1}
              onItemClick={handleItemClick}
              onAddToCart={handleAddToCart}
            />
          </div>
        ))}
      </div>
      {selectedItem && (
        <AddToCartPopup
          item={selectedItem}
          onClose={handleClosePopup}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
}

export default Menu;