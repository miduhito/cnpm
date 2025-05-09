import { memo, useState } from "react";
import { Breadcrumb, Button, Row, Col, Form } from "react-bootstrap";
import { QRCodeCanvas } from 'qrcode.react';
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
  const [formData, setFormData] = useState({
    name: '',
    note: '',
  });
  const [error, setError] = useState('');
  const [printInvoice, setPrintInvoice] = useState(false);

  const totalOrder = cartItems.reduce((sum, item) => {
    return (sum + (parseFloat(item.unitPrice) * item.quantity) + 0.1 * (sum + (parseFloat(item.unitPrice) * item.quantity)));
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
      const orderID = uuidv4();
      // Create order
      await axios.post('http://localhost:3001/orders', {
        orderID,
        customerName: formData.name,
        paymentMethod: paymentMethod.toUpperCase(),
        totalPrice: totalOrder,
        cartID,
        note: formData.note,
        print: printInvoice ? 1 : 0,
      });
  
      // Map payment method to match enum
      const paymentMethodMap = {
        cash: 'CASH',
        momo: 'MOMO',
      };
  
      // Create invoice
      const invoiceData = {
        ID: uuidv4(),
        customerName: formData.name,
        paymentMethod: paymentMethodMap[paymentMethod] || paymentMethod.toUpperCase(),
        totalPrice: Number(totalWithFee.toFixed(2)),
        orderID,
      };
      console.log('Sending invoice data:', invoiceData);
      await axios.post('http://localhost:3001/invoices', invoiceData);
  
      // Reset cart
      localStorage.removeItem('cartID');
      await axios.post('http://localhost:3001/cart', { cartID: uuidv4() }).then((res) => {
        localStorage.setItem('cartID', res.data.cartID);
      });
  
      setShowInvoice(true);
      setError('');
    } catch (err) {
      setError('Lỗi khi tạo đơn hàng hoặc hóa đơn: ' + (err.response?.data?.message || err.message));
      console.error('Chi tiết lỗi:', err.response?.data || err);
    }
  };

  if (showInvoice) {
    return (
      <div className="container">
        <h2 className="text-center">Hóa đơn</h2>
        <div className="invoice">
          <p><strong>Tên khách hàng:</strong> {formData.name}</p>
          <p><strong>Ghi chú:</strong> {formData.note || 'Không có'}</p>
          <p><strong>Phương thức thanh toán:</strong> {paymentMethod === 'cash' ? 'Tiền mặt' : 'MoMo'}</p>
          <h4>Chi tiết đơn hàng</h4>
          <ul>
            {cartItems.map((item, index) => (
              <li key={item.cartItemID || index}>
                {item.product.name} x {item.quantity} - {formatter(item.unitPrice * item.quantity)}
                {item.options?.length > 0 && (
                  <span> (Tùy chọn: {item.options.map((opt) => opt.name).join(', ')})</span>
                )}
              </li>
            ))}
          </ul>
          <p><strong>Tổng cộng:</strong> {formatter(totalWithFee)}</p>
          <Button variant="primary" onClick={() => window.location.href = 'http://localhost:3000/'}>
            Quay lại trang chủ
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
          <Col lg={6} md={12} sm={12} xs={12}>
            <div className="checkout_input">
              <label>
                Name<span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                placeholder="Enter your name"
              />
            </div>
            <div className="checkout_input">
              <label>
                Note
              </label>
              <textarea
                rows={5}
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder="Enter note field"
              ></textarea>
            </div>
            <div className="payment-method">
              <h4>Payment method</h4>
              <div className="payment-option">
                <label className="payment-option-label">
                  <input
                    type="radio"
                    name="payment-method"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={handlePaymentMethodChange}
                  />
                  <span>Cash</span>
                </label>
              </div>
              <div className="payment-option">
                <label className="payment-option-label">
                  <input
                    type="radio"
                    name="payment-method"
                    value="momo"
                    checked={paymentMethod === 'momo'}
                    onChange={handlePaymentMethodChange}
                  />
                  <span>MoMo</span>
                </label>
              </div>
              {paymentMethod === 'momo' && <MomoPersonalQR amount={totalOrder} />}
            </div>
            <div className="print-invoice" style={{ marginTop: '20px' }}>
              <Form.Check
                type="checkbox"
                label="Print Invoice"
                checked={printInvoice}
                onChange={() => setPrintInvoice(!printInvoice)}
              />
            </div>
          </Col>
          <Col lg={6} md={12} sm={12} xs={12}>
            <div className="checkout_order">
              <h3>Order</h3>
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
                <li>
                  <span>Discount</span>
                  <b> </b>
                </li>
                <li className="checkout_order_subtotal">
                  <h3>Total order</h3>
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