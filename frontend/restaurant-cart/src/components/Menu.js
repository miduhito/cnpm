import React, { useState } from 'react';
import MenuItem from './MenuItem';
import AddToCartPopup from './AddToCartPopup';

function Menu({ items, addToCart, category }) {
  const [selectedItem, setSelectedItem] = useState(null);

  // Hàm xử lý khi nhấn vào món ăn
  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  // Hàm đóng popup
  const handleClosePopup = () => {
    setSelectedItem(null);
  };

  // Hàm thêm món vào giỏ hàng
  const handleAddToCart = (item, quantity, sideDish) => {
    addToCart(item, quantity, sideDish);
    setSelectedItem(null); // Đóng popup khi thêm vào giỏ
  };

  // Kiểm tra nếu `items` không phải là mảng hoặc là mảng rỗng
  if (!Array.isArray(items) || items.length === 0) {
    return <p className="text-center">No items available in this category</p>;
  }

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
