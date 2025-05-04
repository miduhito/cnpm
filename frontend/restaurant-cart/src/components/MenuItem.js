import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

function MenuItem({ item, index, onItemClick, onAddToCart }) {
  const handleItemClick = (e) => {
    e.stopPropagation(); // Ngăn sự kiện lan truyền
    console.log('MenuItem clicked to open popup:', item); // Debug để kiểm tra
    if (onItemClick) {
      onItemClick(item);
    } else {
      console.error('onItemClick is not defined');
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation(); // Ngăn sự kiện click trên MenuItem
    console.log('Icon clicked to add to cart:', item); // Debug để kiểm tra
    if (onAddToCart) {
      onAddToCart(item, 1, 'Vegetables'); // Thêm trực tiếp với số lượng 1 và side dish mặc định
    } else {
      console.error('onAddToCart is not defined');
    }
  };

  return (
    <div className="menu-item" onClick={handleItemClick} style={{ cursor: 'pointer' }}>
      <img src={item.image} alt={item.name} />
      <div className="menu-item-content">
        <div className="menu-item-text">
          <h5>
            {index}. {item.name}
          </h5>
          <p>Kr {item.price}.00</p>
        </div>
        <FaShoppingCart
          onClick={handleAddToCart}
          className="menu-item-cart"
        />
      </div>
    </div>
  );
}

export default MenuItem;