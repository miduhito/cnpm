/* eslint-disable react-hooks/rules-of-hooks */
import { memo, useState } from "react";
import { Breadcrumb, Button, Row, Col, Form } from "react-bootstrap";
import { QRCodeCanvas } from 'qrcode.react';
import Rating from 'react-rating-stars-component';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import "./Payment.scss";

// Hàm định dạng tiền tệ
const formatter = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

// Component MoMo QR
function MomoPersonalQR({ amount }) {
  const phoneNumber = '0932744514';
  const note = 'Thanh toan do an';
  const momoLink = `https://nhantien.momo.vn/${phoneNumber}?amount=${amount}&comment=${encodeURIComponent(note)}`;

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>Chuyển {formatter(amount)} qua MoMo</h2>
      <QRCodeCanvas value={momoLink} size={256} />
      <p>Quét mã QR bằng ứng dụng MoMo</p>
    </div>
  );
}

const Payment = ({ cartItems }) => {
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [showInvoice, setShowInvoice] = useState(false);
  const [formData, setFormData] = useState({ name: '', note: '' });
  const [error, setError] = useState('');
  const [printInvoice, setPrintInvoice] = useState(false);
  const [orderID, setOrderID] = useState(uuidv4());

  // Feedback states
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [feedbackSent, setFeedbackSent] = useState(false);

  const totalOrder = cartItems.reduce((sum, item) => {
    return sum + (item.unitPrice * item.quantity);
  }, 0);
  const totalWithFee = totalOrder + (totalOrder * 0.1);

  const handlePaymentMethodChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayNow = async () => {
    if (!formData.name) {
      setError('Vui lòng điền tên khách hàng');
      return;
    }

    const cartID = localStorage.getItem('cartID');
    if (!cartID) {
      setError('Không tìm thấy giỏ hàng');
      return;
    }

    try {
      await axios.post('http://localhost:3001/orders', {
        orderID,
        customerName: formData.name,
        paymentMethod: paymentMethod.toUpperCase(),
        totalPrice: totalOrder,
        cartID,
        note: formData.note,
        print: printInvoice ? 1 : 0,
      });

      const paymentMethodMap = {
        cash: 'CASH',
        momo: 'MOMO',
      };

      const invoiceData = {
        ID: uuidv4(),
        customerName: formData.name.trim(),
        paymentMethod: paymentMethodMap[paymentMethod] || 'CASH',
        totalPrice: Number(totalWithFee.toFixed(2)),
        orderID,
        createdDate: new Date().toISOString(),
      };

      if (!['CASH', 'MOMO', 'CARD', 'ZALO_PAY'].includes(invoiceData.paymentMethod)) {
        throw new Error('Error payment method');
      }

      await axios.post('http://localhost:3001/invoices', invoiceData);

      // Reset cart
      localStorage.removeItem('cartID');
      const response = await axios.post('http://localhost:3001/cart', { cartID: uuidv4() });
      localStorage.setItem('cartID', response.data.cartID);

      setShowInvoice(true);
      setError('');
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(`Error: ${errorMessage}`);
      console.error('Error detail:', err.response?.data || err);
    }
  };

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      setError('Pick one to rate');
      return;
    }

    try {
      const feedback = {
        ID: uuidv4(),
        orderID,
        rating,
        comment,
        createdAt: new Date().toISOString(),
      };
      await axios.post('http://localhost:3001/feedbacks', feedback);
      setFeedbackSent(true);
      setError('');
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setError(`Gửi đánh giá thất bại: ${errorMessage}`);
      console.error('Chi tiết lỗi:', error.response?.data || error);
    }
  };

  const handleRadioRatingChange = (e) => {
    setRating(Number(e.target.value));
  };

  if (showInvoice) {
    return (
      <div className="container">
        <h2 className="text-center">Hóa đơn</h2>
        <div className="invoice">
          <p><strong>Name:</strong> {formData.name}</p>
          <p><strong>Note:</strong> {formData.note || 'None'}</p>
          <p><strong>Payment method:</strong> {paymentMethod === 'cash' ? 'Cash' : 'MoMo'}</p>
          <h4>Orders</h4>
          <ul>
            {cartItems.map((item, index) => (
              <li key={item.cartItemID || index}>
                {item.product.name} x {item.quantity} - {formatter(item.unitPrice * item.quantity)}
                {item.options?.length > 0 && (
                  <span> (Option: {item.options.map((opt) => opt.name).join(', ')})</span>
                )}
              </li>
            ))}
          </ul>
          <p><strong>Total:</strong> {formatter(totalWithFee)}</p>
          {!feedbackSent && (
            <div className="feedback-form" style={{ marginTop: '20px', padding: '15px', border: '1px solid #ddd', borderRadius: '5px' }}>
              <h4>Rating Orders</h4>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
                  Pick (1-5):
                </label>
                <Rating
                  value={rating}
                  count={5}
                  size={30}
                  activeColor="#ffd700"
                  onChange={(newRating) => setRating(newRating)}
                />
                <div style={{ marginTop: '10px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <label key={star} style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="rating"
                        value={star}
                        checked={rating === star}
                        onChange={handleRadioRatingChange}
                        style={{ marginRight: '5px' }}
                      />
                      {star} starts
                    </label>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: '15px' }}>
                <label style={{ fontWeight: 'bold', marginBottom: '5px', display: 'block' }}>
                  Comment:
                </label>
                <textarea
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Share your thoughts"
                  style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
                />
              </div>
              <Button variant="success" onClick={handleSubmitFeedback}>
                Send
              </Button>
            </div>
          )}
          {feedbackSent && <p className="text-success" style={{ marginTop: '15px' }}>Thanks for rating</p>}
          <Button
            variant="primary"
            onClick={() => window.location.href = 'http://localhost:3000/'}
            style={{ marginTop: '15px' }}
          >
            Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="payment-header">
        <a href="http://localhost:3000/">
          <Button variant="link" className="back-btn">
            <span className="back-icon">←</span> Back
          </Button>
        </a>
        <Breadcrumb>
          <Breadcrumb.Item active>Payment</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="container">
        {error && <div className="alert alert-danger">{error}</div>}
        <Row>
          <Col lg={6}>
            <div className="checkout_input">
              <label>
                Name<span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Nhập tên của bạn"
              />
            </div>
            <div className="checkout_input">
              <label>Note</label>
              <textarea
                rows={5}
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder="Nhập ghi chú"
              ></textarea>
            </div>
            <div className="payment-method">
              <h4>Payment method</h4>
              {['cash', 'momo'].map((method) => (
                <div className="payment-option" key={method}>
                  <label className="payment-option-label">
                    <input
                      type="radio"
                      name="payment-method"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={handlePaymentMethodChange}
                    />
                    <span>{method === 'cash' ? 'Cash' : 'MoMo'}</span>
                  </label>
                </div>
              ))}
              {paymentMethod === 'momo' && <MomoPersonalQR amount={totalOrder} />}
            </div>
            <Form.Check
              type="checkbox"
              label="print Invoice"
              checked={printInvoice}
              onChange={() => setPrintInvoice(!printInvoice)}
              style={{ marginTop: '20px' }}
            />
          </Col>
          <Col lg={6}>
            <div className="checkout_order">
              <h3>Orders</h3>
              <ul>
                {cartItems.map((item, index) => (
                  <li key={item.cartItemID || index}>
                    <span>
                      {item.product.name} x {item.quantity}
                      {item.options?.length > 0 && (
                        <span> (Tùy chọn: {item.options.map((opt) => opt.name).join(', ')})</span>
                      )}
                    </span>
                    <b>{formatter(item.unitPrice * item.quantity)}</b>
                  </li>
                ))}
                <li className="checkout_order_subtotal">
                  <h3>Total</h3>
                  <b>{formatter(totalWithFee)}</b>
                </li>
              </ul>
              <button type="button" className="button-submit" onClick={handlePayNow}>
                Pay now {formatter(totalWithFee)}
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default memo(Payment);