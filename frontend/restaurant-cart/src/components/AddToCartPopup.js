import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

function AddToCartPopup({ item, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptionIDs, setSelectedOptionIDs] = useState([]);

  // Tính tổng giá của các tùy chọn đã chọn
  const calculateOptionsPrice = () => {
    return selectedOptionIDs.reduce((sum, optionID) => {
      const found = item.options?.find((opt) => opt.optionID === optionID);
      return sum + (found ? parseFloat(found.price) : 0);
    }, 0);
  };

  // Xử lý khi thêm vào giỏ hàng
  const handleAdd = () => {
    onAddToCart(item, quantity, selectedOptionIDs);
  };

  // Xử lý chọn/bỏ chọn tùy chọn
  const handleOptionChange = (optionID) => {
    setSelectedOptionIDs((prev) =>
      prev.includes(optionID) ? prev.filter((id) => id !== optionID) : [...prev, optionID]
    );
  };

  return (
    <Modal show={!!item} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontWeight: 'bold' }}>ADD TO CART</Modal.Title>
      </Modal.Header>
      <Modal.Body className="popup-body">
        <div className="popup-header">
          <img
            src={`/images/${item.img}`}
            alt={item.name}
            style={{ width: '100px', height: '100px', marginRight: '15px' }}
          />
          <div>
            <div className="popup-sku">SKU</div>
            <div>401</div>
            <div className="popup-name">{item.name}</div>
            <div>Burger</div>
          </div>
          <div className="popup-price-container">
            <div className="popup-price-label">Unit Price</div>
            <div className="popup-price">Kr {parseFloat(item.price).toFixed(2)}</div>
          </div>
        </div>
        <div className="popup-quantity">
          <span>Quantity</span>
          <div>
            <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(quantity + 1)}>+</button>
          </div>
        </div>
        <div className="popup-details">
          <div>
            <span className="popup-detail-label">PROTEIN :</span>
            <span>What is Lorem ipsum?</span>
          </div>
          <div>
            <span className="popup-detail-label">ADDITIVES :</span>
            <span>03</span>
          </div>
          <div>
            <span className="popup-detail-label">BAKING material :</span>
            <span>040</span>
          </div>
          <div>
            <span className="popup-detail-label">FOOD decoration :</span>
            <span>04</span>
          </div>
          <div>
            <span className="popup-detail-label">Description :</span>
            <span>{item.description}</span>
          </div>
        </div>
        <div className="popup-side-dishes">
          <div className="popup-side-dishes-label">SIDE dishes (*)</div>
          <div style={{ fontSize: '0.75rem', color: '#666' }}>
            Please select one of the properties below
          </div>
          {item.options && item.options.length > 0 ? (
            item.options.map((option) => (
              <label key={option.optionID} style={{ display: 'block', marginTop: '5px' }}>
                <input
                  type="checkbox"
                  checked={selectedOptionIDs.includes(option.optionID)}
                  onChange={() => handleOptionChange(option.optionID)}
                />
                <span style={{ marginLeft: '5px' }}>
                  {option.name} (+Kr {parseFloat(option.price).toFixed(2)})
                </span>
              </label>
            ))
          ) : (
            <div style={{ fontStyle: 'italic', color: '#888' }}>No options available</div>
          )}
        </div>
        <button className="popup-add-button" onClick={handleAdd}>
          Kr {(parseFloat(item.price) * quantity + calculateOptionsPrice()).toFixed(2)}
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default AddToCartPopup;