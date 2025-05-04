import React, { useState } from 'react';
import { Modal } from 'react-bootstrap';

function AddToCartPopup({ item, onClose, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);
  const [sideDish, setSideDish] = useState('Vegetables');

  const handleAdd = () => {
    onAddToCart(item, quantity, sideDish);
  };

  return (
    <Modal show={!!item} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontWeight: 'bold' }}>ADD TO CART</Modal.Title>
      </Modal.Header>
      <Modal.Body className="popup-body">
        <div className="popup-header">
          <img src={item.image} alt={item.name} style={{ width: '100px', height: '100px', marginRight: '15px' }} />
          <div>
            <div className="popup-sku">SKU</div>
            <div>401</div>
            <div className="popup-name">{item.name}</div>
            <div>Burger</div>
          </div>
          <div className="popup-price-container">
            <div className="popup-price-label">Unit Price</div>
            <div className="popup-price">Kr {item.price}.00</div>
          </div>
        </div>
        <div className="popup-quantity">
          <span>Quantity</span>
          <div>
            <button onClick={() => setQuantity(quantity - 1)} disabled={quantity <= 1}>-</button>
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
        </div>
        <div className="popup-side-dishes">
          <div className="popup-side-dishes-label">SIDE dishes (*)</div>
          <div style={{ fontSize: '0.75rem', color: '#666' }}>Please select one of the properties below</div>
          <label>
            <input
              type="checkbox"
              checked={sideDish === 'Vegetables'}
              onChange={() => setSideDish(sideDish === 'Vegetables' ? '' : 'Vegetables')}
            />
            <span style={{ marginLeft: '5px' }}>Vegetables</span>
          </label>
        </div>
        <button className="popup-add-button" onClick={handleAdd}>
          Kr {item.price * quantity}.00
        </button>
      </Modal.Body>
    </Modal>
  );
}

export default AddToCartPopup;