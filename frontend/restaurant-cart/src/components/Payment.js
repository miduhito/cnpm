import { memo, useState } from "react";
import { Breadcrumb, Button, Row, Col } from "react-bootstrap";
import "./Payment.scss";

const formatter = (value) => {
  return `Kr ${value.toFixed(2)}`;
};

const Payment = ({ cartItems, total, onPay, onBack,cart }) => {
  const [formData, setFormData] = useState({
    customerName: "",
    address: "",
    phoneNumber: "",
    note: "",
    paymentMethod: "CASH",
    print: false,
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePaymentMethodChange = (e) => {
    setFormData((prev) => ({ ...prev, paymentMethod: e.target.value }));
  };

  const handlePay = async () => {
    setIsLoading(true);
    setError(null);

    const hasSomeInput =
      formData.customerName.trim() !== "" ||
      formData.address.trim() !== "" ||
      formData.phoneNumber.trim() !== "";
    const hasAllInputs =
      formData.customerName.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.phoneNumber.trim() !== "";

    if (hasSomeInput && !hasAllInputs) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc hoặc để trống tất cả.");
      setIsLoading(false);
      return;
    }

    try {
      const orderRequest = {
        orderID: crypto.randomUUID(),
        customerName: formData.customerName || "Not provided",
        paymentMethod: formData.paymentMethod,
        totalPrice: parseFloat(total),
        cartID: cart,
        note: formData.note || undefined,
        print: formData.print,
      };

      const response = await fetch("http://localhost:3001/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderRequest),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Thanh toán thất bại");
      }

      const result = await response.json();
      onPay({
        orderId: result.orderID,
        cart,
        paymentDetails: {
          customerName: formData.customerName || "Not provided",
          address: formData.address || "Not provided",
          phoneNumber: formData.phoneNumber || "Not provided",
          paymentMethod: formData.paymentMethod,
          note: formData.note,
          print: formData.print,
        },
      });

      alert("Thanh toán thành công!");
    } catch (err) {
      setError("Lỗi: " + err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-header">
        <Button variant="link" className="back-btn" onClick={onBack}>
          <span className="back-icon">←</span> Back
        </Button>
        <Breadcrumb>
          <Breadcrumb.Item active>Payment</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="payment-content">
        <Row>
          <Col lg={6} md={12} sm={12} xs={12}>
            <div className="checkout-form">
              <h2 className="section-title">Billing Information (Optional)</h2>
              <div className="checkout_input">
                <label>
                  Customer Name{formData.customerName && <span className="required">*</span>}
                </label>
                <input
                  type="text"
                  name="customerName"
                  placeholder="Enter customer name"
                  value={formData.customerName}
                  onChange={handleInputChange}
                />
              </div>
              <div className="checkout_input">
                <label>
                  Address{formData.address && <span className="required">*</span>}
                </label>
                <input
                  type="text"
                  name="address"
                  placeholder="Enter address"
                  value={formData.address}
                  onChange={handleInputChange}
                />
              </div>
              <div className="checkout_input_group">
                <div className="checkout_input">
                  <label>
                    Phone Number{formData.phoneNumber && <span className="required">*</span>}
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    placeholder="Enter phone number"
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="checkout_input">
                  <label>Note</label>
                  <textarea
                    rows={5}
                    name="note"
                    placeholder="Enter notes (optional)"
                    value={formData.note}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
              </div>
              <div className="payment-method">
                <h4>Payment Method</h4>
                <div className="payment-option">
                  <label className="payment-option-label">
                    <input
                      type="radio"
                      name="payment-method"
                      value="CASH"
                      checked={formData.paymentMethod === "CASH"}
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
                      value="MOMO"
                      checked={formData.paymentMethod === "MOMO"}
                      onChange={handlePaymentMethodChange}
                    />
                    <span>Momo</span>
                  </label>
                </div>
                {formData.paymentMethod === "MOMO" && (
                  <div className="momo-qr">
                    <h2>Scan to Pay</h2>
                    <img src="/images/qr.jpg" alt="QR Code" className="qr-code-img" />
                    <p>Please scan the QR code using your Momo app to complete the payment.</p>
                  </div>
                )}
              </div>
              {error && <p className="error-message">{error}</p>}
              {isLoading && <p className="loading-message">Đang xử lý thanh toán...</p>}
              <div className="payment-method">
                  <label>
                    <input
                      type="checkbox"
                      name="print"
                      checked={formData.print}
                      onChange={handleInputChange}
                    />
                    Print Receipt
                  </label>
                </div>
            </div>
          </Col>
          <Col lg={6} md={12} sm={12} xs={12}>
            <div className="checkout_order">
              <h3>Order Summary</h3>
              <ul>
                {cartItems.map((item, index) => (
                  <li key={index}>
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <b>{formatter(item.unitPrice * item.quantity)}</b>
                  </li>
                ))}
                <li>
                  <span>Discount</span>
                  <b>{formatter(0)}</b>
                </li>
                <li className="checkout_order_subtotal">
                  <h3>Total</h3>
                  <b>{formatter(total)}</b>
                </li>
              </ul>
              <button
                type="button"
                className="button-submit"
                onClick={handlePay}
                disabled={isLoading}
              >
                Pay Now {formatter(total)}
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default memo(Payment);