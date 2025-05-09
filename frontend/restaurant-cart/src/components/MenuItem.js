import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

function MenuItem({ item, index, onItemClick, onAddToCart }) {
  const handleItemClick = (e) => {
    e.stopPropagation();
    if (onItemClick) {
      onItemClick(item);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart(item, 1, []);
    }
  };

  return (
    <div className="menu-item" onClick={handleItemClick} style={{ cursor: 'pointer' }}>
      <img src={`/images/${item.img}`} alt={item.name} className="img-fluid" />
      <div className="menu-item-content">
        <div className="menu-item-text">
          <h5>
            {index}. {item.name}
          </h5>
          <p>Kr {parseFloat(item.price).toFixed(2)}</p>
        </div>
        <FaShoppingCart
          onClick={handleAddToCart}
          className="menu-item-cart"
          style={{ fontSize: '10px', padding: '8px' }}
        />
      </div>
    </div>
  );
}

export default MenuItem;