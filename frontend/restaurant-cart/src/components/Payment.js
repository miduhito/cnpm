import React, { useState } from 'react';

const formatter = (value) => {
  return new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  }).format(value * 23000);
};

function Payment({ cartItems, total, onPay, onBack }) {
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [note, setNote] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('credit-card');

  const handlePay = () => {
    if (!businessName || !address || !phone || !note) {
      alert('Please fill in all required fields.');
      return;
    }
    onPay({ businessName, address, phone, note, paymentMethod });
  };

  return (
    <div style={{ padding: '20px', backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        <button
          onClick={onBack}
          style={{
            display: 'flex',
            alignItems: 'center',
            background: 'none',
            border: 'none',
            color: '#000',
            textDecoration: 'none',
            marginRight: '20px',
            cursor: 'pointer',
          }}
        >
          <span style={{ marginRight: '5px', fontSize: '16px' }}>←</span> Back
        </button>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#1F2937' }}>
          Payment
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ flex: '1 1 50%', minWidth: '300px' }}>
            <div style={{ marginTop: '20px' }}>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
                Business name<span style={{ color: '#ff0000', marginLeft: '5px' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter business name"
                value={businessName}
                onChange={(e) => setBusinessName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #dedede',
                  borderRadius: '4px',
                  margin: '5px 0',
                  fontSize: '14px',
                }}
              />
            </div>
            <div style={{ marginTop: '20px' }}>
              <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
                Address<span style={{ color: '#ff0000', marginLeft: '5px' }}>*</span>
              </label>
              <input
                type="text"
                placeholder="Enter address field"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px',
                  border: '1px solid #dedede',
                  borderRadius: '4px',
                  margin: '5px 0',
                  fontSize: '14px',
                }}
              />
            </div>
            <div style={{ display: 'flex', gap: '2%', marginTop: '20px' }}>
              <div style={{ flex: '0 0 49%' }}>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
                  Phone number<span style={{ color: '#ff0000', marginLeft: '5px' }}>*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter phone field"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #dedede',
                    borderRadius: '4px',
                    margin: '5px 0',
                    fontSize: '14px',
                  }}
                />
              </div>
              <div style={{ flex: '0 0 49%' }}>
                <label style={{ display: 'block', fontWeight: '500', marginBottom: '5px' }}>
                  Note<span style={{ color: '#ff0000', marginLeft: '5px' }}>*</span>
                </label>
                <textarea
                  rows={5}
                  placeholder="Enter note field"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '10px',
                    border: '1px solid #dedede',
                    borderRadius: '4px',
                    margin: '5px 0',
                    fontSize: '14px',
                    resize: 'vertical',
                  }}
                />
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <h4 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '15px' }}>
                Payment method
              </h4>
              <div style={{ marginBottom: '10px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    border: '1px solid #dedede',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    value="credit-card"
                    checked={paymentMethod === 'credit-card'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                  <span style={{ flex: 1, fontSize: '16px' }}>Credit Card</span>
                  <div style={{ display: 'flex', gap: '5px' }}>
                    <span style={{ fontSize: '14px', color: '#1a1f71' }}>Visa</span>
                    <span style={{ fontSize: '14px', color: '#eb001b' }}>Mastercard</span>
                  </div>
                </label>
              </div>
              <div style={{ marginBottom: '10px' }}>
                <label
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '10px',
                    border: '1px solid #dedede',
                    borderRadius: '4px',
                    cursor: 'pointer',
                  }}
                >
                  <input
                    type="radio"
                    name="payment-method"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    style={{ marginRight: '10px' }}
                  />
                  <span style={{ flex: 1, fontSize: '16px' }}>Paypal</span>
                </label>
              </div>
            </div>
          </div>
          <div style={{ flex: '1 1 50%', minWidth: '300px' }}>
            <div
              style={{
                background: '#ffffff',
                padding: '30px',
                border: '1px solid #dedede',
                borderRadius: '4px',
              }}
            >
              <h3 style={{ borderBottom: '1px solid #dedede', paddingBottom: '10px', marginBottom: '20px', fontSize: '20px', fontWeight: 'bold' }}>
                Order
              </h3>
              <ul style={{ padding: 0, margin: '0 0 20px 0' }}>
                {cartItems.map((item, index) => (
                  <li
                    key={index}
                    style={{
                      listStyle: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      marginBottom: '10px',
                      fontSize: '16px',
                    }}
                  >
                    <span>{item.name} x {item.quantity}</span>
                    <b>Kr {(item.price * item.quantity).toFixed(2)}</b>
                  </li>
                ))}
                <li
                  style={{
                    listStyle: 'none',
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px',
                    fontSize: '16px',
                  }}
                >
                  <span>Discount</span>
                  <b>0 VND</b>
                </li>
                <li
                  style={{
                    borderTop: '1px solid #dedede',
                    borderBottom: '1px solid #dedede',
                    padding: '10px 0',
                    marginBottom: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                  }}
                >
                  <h3 style={{ border: 'none', margin: 0, padding: 0, fontSize: '18px' }}>
                    Total order
                  </h3>
                  <b style={{ fontSize: '18px', color: '#333' }}>{formatter(total)}</b>
                </li>
              </ul>
              <button
                onClick={handlePay}
                style={{
                  width: '100%',
                  padding: '12px',
                  background: '#28a745',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '4px',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => e.target.style.background = '#218838'}
                onMouseOut={(e) => e.target.style.background = '#28a745'}
              >
                Pay now {formatter(total)}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;