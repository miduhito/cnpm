import React, { useState, useEffect } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import './Payment.scss';

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
    <div className="momo-qr">
      <h2>Chuyển {formatter(amount)} qua MoMo</h2>
      <QRCodeCanvas value={momoLink} size={256} />
      <p>Quét mã QR bằng ứng dụng MoMo</p>
    </div>
  );
}

function Payment({ cartItems, onPay, onBack }) {
  const [businessName, setBusinessName] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [printInvoice, setPrintInvoice] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [error, setError] = useState('');
  const [orderID] = useState(uuidv4());
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  // Tính tổng tiền với 10% thuế, đổi từ USD sang VND (x25,000)
  const totalOrder = cartItems.reduce((sum, item) => {
    const optionTotal = (item.options || []).reduce((optSum, opt) => optSum + parseFloat(opt.price || 0) * 25000, 0);
    return sum + (parseFloat(item.price || 0) * 25000 + optionTotal) * item.quantity;
  }, 0);
  const totalWithFee = totalOrder;

  // Khởi tạo cartID nếu chưa có
  useEffect(() => {
    let cartID = localStorage.getItem('cartID');
    if (!cartID) {
      cartID = uuidv4();
      axios
        .post('http://localhost:3001/cart', { cartID })
        .then((response) => {
          localStorage.setItem('cartID', response.data.cartID);
        })
        .catch((err) => {
          console.error('Lỗi khi khởi tạo giỏ hàng:', err);
          setError('Không thể khởi tạo giỏ hàng. Vui lòng thử lại.');
        });
    } else {
      axios
        .get(`http://localhost:3001/cart/${cartID}`)
        .then((response) => {})
        .catch((err) => {
          console.error('Lỗi khi kiểm tra cartID:', err);
          setError('Giỏ hàng không tồn tại. Đang tạo giỏ hàng mới.');
          const newCartID = uuidv4();
          axios
            .post('http://localhost:3001/cart', { cartID: newCartID })
            .then((response) => {
              localStorage.setItem('cartID', response.data.cartID);
            })
            .catch((err) => {
              console.error('Lỗi khi khởi tạo giỏ hàng mới:', err);
              setError('Không thể khởi tạo giỏ hàng. Vui lòng thử lại.');
            });
        });
    }
  }, []);

  const handlePay = async () => {
    if (!businessName) {
      setError('Vui lòng điền tên khách hàng');
      return;
    }

    const cartID = localStorage.getItem('cartID');
    if (!cartID) {
      setError('Không tìm thấy giỏ hàng. Vui lòng thử lại.');
      return;
    }

    try {
      await axios.post('http://localhost:3001/orders', {
        orderID,
        customerName: businessName,
        paymentMethod: paymentMethod.toUpperCase(),
        totalPrice: Number(totalWithFee.toFixed(2)),
        cartID,
        note,
        print: printInvoice,
      });

      const invoiceData = {
        ID: uuidv4(),
        customerName: businessName.trim(),
        paymentMethod: paymentMethod.toUpperCase(),
        totalPrice: Number(totalWithFee.toFixed(2)),
        orderID,
        createdDate: new Date().toISOString(),
      };

      await axios.post('http://localhost:3001/invoices', invoiceData);

      localStorage.removeItem('cartID');
      const response = await axios.post('http://localhost:3001/cart', { cartID: uuidv4() });
      localStorage.setItem('cartID', response.data.cartID);

      setShowFeedback(true);
      setError('');
      onPay({ businessName, note, paymentMethod });
    } catch (err) {
      const errorMessage = err.response?.data?.message || err.message;
      setError(`Lỗi: ${errorMessage}`);
      console.error('Chi tiết lỗi:', err.response?.data || err);
    }
  };

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      setError('Vui lòng chọn số sao để đánh giá');
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
      setError('');
      setShowFeedback(false);
      window.location.href = 'http://localhost:3000/';
    } catch (error) {
      const errorMessage = error.response?.data?.message || error.message;
      setError(`Gửi đánh giá thất bại: ${errorMessage}`);
      console.error('Chi tiết lỗi:', error.response?.data || error);
    }
  };

  const handleSkipFeedback = () => {
    setShowFeedback(false);
    window.location.href = 'http://localhost:3000/';
  };

  if (showFeedback) {
    return (
      <div className="feedback-container">
        <div className="feedback-form">
          <h2>Đánh giá đơn hàng</h2>
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          <div className="rating-section">
            <label>Chọn số sao (1-5):</label>
            <div className="radio-rating">
              {[1, 2, 3, 4, 5].map((star) => (
                <label key={star}>
                  <input
                    type="radio"
                    name="rating"
                    value={star}
                    checked={rating === star}
                    onChange={() => setRating(star)}
                  />
                  {star} sao
                </label>
              ))}
            </div>
          </div>
          <div className="comment-section">
            <label>Nhận xét:</label>
            <textarea
              rows={4}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Chia sẻ ý kiến của bạn"
            />
          </div>
          <button
            onClick={handleSubmitFeedback}
            className="submit-feedback-btn"
          >
            Gửi đánh giá
          </button>
          <button
            onClick={handleSkipFeedback}
            className="skip-feedback-btn"
          >
            Bỏ qua
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="payment-header">
        <button onClick={onBack} className="back-btn">
          <span className="back-icon">←</span> Quay lại
        </button>
        <div className="breadcrumb">
          <span className="breadcrumb-item">Thanh toán</span>
        </div>
      </div>
      <div>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}
        <div className="checkout-content">
          <div className="checkout-form">
            <div className="checkout_input">
              <label>
                Tên khách hàng<span className="required">*</span>
              </label>
              <input
                type="text"
                placeholder="Nhập tên khách hàng"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
              />
            </div>
            <div className="checkout_input">
              <label>Ghi chú</label>
              <textarea
                rows={5}
                placeholder="Nhập ghi chú"
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </div>
            <div className="payment-method">
              <h4>Phương thức thanh toán</h4>
              {['cash', 'momo'].map((method) => (
                <div key={method} className="payment-option">
                  <label className="payment-option-label">
                    <input
                      type="radio"
                      name="payment-method"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    />
                    <span>{method === 'cash' ? 'Tiền mặt' : 'MoMo'}</span>
                  </label>
                </div>
              ))}
              {paymentMethod === 'momo' && <MomoPersonalQR amount={totalWithFee} />}
            </div>
            <div className="print-invoice">
              <label>
                <input
                  type="checkbox"
                  checked={printInvoice}
                  onChange={() => setPrintInvoice(!printInvoice)}
                />
                In hóa đơn
              </label>
            </div>
          </div>
          <div className="checkout_order">
            <h3>Đơn hàng</h3>
            <ul>
              {cartItems.map((item, index) => (
                <li key={item.cartItemID || index}>
                  <span>
                    {item.name || 'Sản phẩm không xác định'} x {item.quantity}
                    {item.options?.length > 0 && (
                      <span> (Tùy chọn: {item.options.map((opt) => opt.name || 'Không xác định').join(', ')})</span>
                    )}
                  </span>
                  <b>{formatter(parseFloat(item.price || 0) * 25000 * item.quantity)}</b>
                </li>
              ))}
              <li className="checkout_order_subtotal">
                <h3>Tổng cộng</h3>
                <b>{formatter(totalWithFee)}</b>
              </li>
            </ul>
            <button
              onClick={handlePay}
              className="button-submit"
            >
              Thanh toán {formatter(totalWithFee)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;