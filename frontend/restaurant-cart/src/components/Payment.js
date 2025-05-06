import { memo } from "react";
import { Breadcrumb, Button, Row, Col } from "react-bootstrap";
import "./Payment.scss";

// Hàm định dạng tiền tệ
const formatter = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value);
};

const Payment = () => {
  return (
    <>
      <div className="payment-header">
        <Button variant="link" className="back-btn">
          <span className="back-icon">←</span> Back
        </Button>
        <Breadcrumb>
          <Breadcrumb.Item active>Payment</Breadcrumb.Item>
        </Breadcrumb>
      </div>
      <div className="container">
        <Row>
          {/* Cột trái: Form thông tin */}
          <Col lg={6} md={12} sm={12} xs={12}>
            <div className="checkout_input">
              <label>
                Business name<span className="required">*</span>
              </label>
              <input type="text" placeholder="Enter business name" />
            </div>
            <div className="checkout_input">
              <label>
                Address<span className="required">*</span>
              </label>
              <input type="text" placeholder="Enter address field" />
            </div>
            <div className="checkout_input_group">
              <div className="checkout_input">
                <label>
                  Phone number<span className="required">*</span>
                </label>
                <input type="text" placeholder="Enter phone field" />
              </div>
              <div className="checkout_input">
                <label>
                  Note<span className="required">*</span>
                </label>
                <textarea rows={5} placeholder="Enter note field"></textarea>
              </div>
            </div>

            {/* Thêm phần phương thức thanh toán */}
            <div className="payment-method">
              <h4>Payment method</h4>
              <div className="payment-option">
                <label className="payment-option-label">
                  <input
                    type="radio"
                    name="payment-method"
                    value="credit-card"
                    defaultChecked
                  />
                  <span>Credit Card</span>
                  <div className="card-icons">
                    <span className="visa-icon">Visa</span>
                    <span className="mastercard-icon">Mastercard</span>
                  </div>
                </label>
              </div>
              <div className="payment-option">
                <label className="payment-option-label">
                  <input type="radio" name="payment-method" value="paypal" />
                  <span>Paypal</span>
                </label>
              </div>
            </div>
          </Col>

          {/* Cột phải: Tóm tắt đơn hàng */}
          <Col lg={6} md={12} sm={12} xs={12}>
            <div className="checkout_order">
              <h3>Order</h3>
              <ul>
                <li>
                  <span>Discount</span>
                  <b>0 VND</b>
                </li>
                <li className="checkout_order_subtotal">
                  <h3>Total order</h3>
                  <b>{formatter(200000)}</b>
                </li>
              </ul>
              <button type="button" className="button-submit">
                Pay now {formatter(200000)}
              </button>
            </div>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default memo(Payment);