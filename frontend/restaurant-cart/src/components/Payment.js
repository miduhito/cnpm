import { memo, useState } from "react";
import { Breadcrumb, Button, Row, Col } from "react-bootstrap";
import "./Payment.scss";

const formatter = (value) => {
  return `Kr ${value.toFixed(2)}`; // Định dạng thủ công: "Kr 150.00"
};

const Payment = ({ cartItems, total, onPay, onBack }) => {
  const [formData, setFormData] = useState({
    businessName: "",
    address: "",
    phoneNumber: "",
    notes: "",
    paymentMethod: "CASH",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePaymentMethodChange = (e) => {
    setFormData((prev) => ({ ...prev, paymentMethod: e.target.value }));
  };

  const handlePay = async () => {
    setIsLoading(true);
    setError(null);

    // Kiểm tra nếu người dùng nhập ít nhất một trường thì phải nhập đầy đủ
    const hasSomeInput =
      formData.businessName.trim() !== "" ||
      formData.address.trim() !== "" ||
      formData.phoneNumber.trim() !== "";
    const hasAllInputs =
      formData.businessName.trim() !== "" &&
      formData.address.trim() !== "" &&
      formData.phoneNumber.trim() !== "";

    if (hasSomeInput && !hasAllInputs) {
      setError("Vui lòng điền đầy đủ thông tin bắt buộc hoặc để trống tất cả.");
      setIsLoading(false);
      return;
    }

    try {
      const orderRequest = {
        customerId: 1,
        items: cartItems.map((item) => ({
          productId: parseInt(item.id),
          name: item.name,
          price: parseFloat(item.unitPrice),
          quantity: item.quantity,
        })),
        address: formData.address || "Not provided",
        phoneNumber: formData.phoneNumber || "Not provided",
        paymentMethod: formData.paymentMethod,
        notes: formData.notes,
      };

      const response = await fetch("http://localhost:3001/api/orders/checkout", {
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
        orderId: result.data.id,
        cartItems,
        paymentDetails: {
          businessName: formData.businessName || "Not provided",
          address: formData.address || "Not provided",
          phoneNumber: formData.phoneNumber || "Not provided",
          paymentMethod: formData.paymentMethod,
          notes: formData.notes,
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
                  Business Name{formData.businessName && <span className="required">*</span>}
                </label>
                <input
                  type="text"
                  name="businessName"
                  placeholder="Enter business name"
                  value={formData.businessName}
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
                    name="notes"
                    placeholder="Enter notes (optional)"
                    value={formData.notes}
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
                      value="BANK_TRANSFER"
                      checked={formData.paymentMethod === "BANK_TRANSFER"}
                      onChange={handlePaymentMethodChange}
                    />
                    <span>Bank Transfer</span>
                  </label>
                </div>
                {formData.paymentMethod === "BANK_TRANSFER" && (
                  <div className="momo-qr">
                    <h2>Scan to Pay</h2>
                    <img src="/images/qr.jpg" alt="QR Code" className="qr-code-img" />
                    <p>Please scan the QR code using your mobile banking app to complete the payment.</p>
                  </div>
                )}
              </div>
              {error && <p className="error-message">{error}</p>}
              {isLoading && <p className="loading-message">Đang xử lý thanh toán...</p>}
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