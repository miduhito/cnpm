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

  const handleAddToCart = (item, quantity, sideDish) => {
    addToCart(item, quantity, sideDish);
    setSelectedItem(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">{category}</h2>
      <div className="row">
        {items.map((item, idx) => (
          <div className="col-12 col-md-4 mb-4" key={item.id}>
            <MenuItem
              item={item}
              index={idx + 1}
              onItemClick={handleItemClick}
              onAddToCart={addToCart}
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