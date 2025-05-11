import React from 'react';

function Menu({ menuItems, addToCart, cartItems, completeOrder, role }) {
  return (
    <div style={{ marginLeft: '250px', padding: '30px', backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#ef4444', marginBottom: '20px' }}>Menu</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {Object.entries(menuItems).map(([category, items]) => (
          <div key={category} style={{ flex: '1 1 300px', minWidth: '250px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '10px' }}>
              {category}
            </h2>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#ffffff',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid #ddd',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  marginBottom: '10px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div>
                  <h3 style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>{item.name}</h3>
                  <p style={{ fontSize: '14px', color: '#6B7280' }}>{item.price} Kr</p>
                </div>
                {role === 'staff' || role === 'manager' ? (
                  <button
                    onClick={() => addToCart(item)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#ef4444',
                      color: '#ffffff',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
                    onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
                  >
                    Add to Cart
                  </button>
                ) : null}
              </div>
            ))}
          </div>
        ))}
      </div>

      {(role === 'staff' || role === 'manager') && cartItems.length > 0 && (
        <div style={{
          marginTop: '30px',
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          border: '1px solid #ddd',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '10px' }}>Cart</h2>
          <ul style={{ listStyle: 'none', padding: 0, marginBottom: '15px' }}>
            {cartItems.map((item) => (
              <li key={item.cartId} style={{ marginBottom: '5px', color: '#6B7280' }}>
                {item.name} - {item.price} Kr
              </li>
            ))}
          </ul>
          <p style={{ fontSize: '16px', fontWeight: '500', color: '#1F2937' }}>
            Total: {cartItems.reduce((sum, item) => sum + item.price, 0)} Kr
          </p>
          <button
            onClick={completeOrder}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
          >
            Complete Order
          </button>
        </div>
      )}

      {/* Responsive design */}
      <style>
        {`
          @media (max-width: 768px) {
            div[style*='margin-left: 250px'] {
              margin-left: 0;
              width: 100%;
            }
            div[style*='flex-wrap: wrap'] {
              flex-direction: column;
            }
            div[style*='background-color: #ffffff'][style*='padding: 20px'] {
              width: 90%;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Menu;