import React from 'react';
import { FaUtensils, FaShoppingCart, FaUsers } from 'react-icons/fa';

function Dashboard({ menuItems, cartItems, users }) {
  const totalProducts = Object.values(menuItems).reduce((acc, category) => acc + category.length, 0);
  const totalOrders = cartItems.length;
  const totalUsers = users.length;

  return (
    <div style={{ marginLeft: '250px', padding: '30px', backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '30px', fontWeight: 'bold', color: '#ef4444', marginBottom: '24px' }}>
        Dashboard
      </h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '24px' }}>
        {/* Card: Tổng số sản phẩm */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#4B5563', marginBottom: '8px' }}>
                Total Products
              </h2>
              <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827' }}>
                {totalProducts}
              </p>
            </div>
            <FaUtensils style={{ color: '#4B5563', fontSize: '24px' }} />
          </div>
        </div>

        {/* Card: Tổng số đơn hàng */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#4B5563', marginBottom: '8px' }}>
                Total Orders
              </h2>
              <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827' }}>
                {totalOrders}
              </p>
            </div>
            <FaShoppingCart style={{ color: '#4B5563', fontSize: '24px' }} />
          </div>
        </div>

        {/* Card: Tổng số người dùng */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '24px',
          borderRadius: '8px',
          border: '1px solid #E5E7EB',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h2 style={{ fontSize: '18px', fontWeight: '600', color: '#4B5563', marginBottom: '8px' }}>
                Total Users
              </h2>
              <p style={{ fontSize: '30px', fontWeight: 'bold', color: '#111827' }}>
                {totalUsers}
              </p>
            </div>
            <FaUsers style={{ color: '#4B5563', fontSize: '24px' }} />
          </div>
        </div>
      </div>

      {/* Danh sách sản phẩm gần đây */}
      <div style={{
        marginTop: '32px',
        backgroundColor: '#ffffff',
        padding: '24px',
        borderRadius: '8px',
        border: '1px solid #E5E7EB',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1F2937', marginBottom: '16px' }}>
          Recent Products
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {Object.entries(menuItems).slice(0, 3).map(([category, items]) => (
            <div key={category}>
              <h3 style={{ fontSize: '18px', fontWeight: '500', color: '#4B5563', marginBottom: '8px' }}>
                {category}
              </h3>
              <ul style={{ listStyle: 'disc', paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                {items.slice(0, 2).map((item) => (
                  <li key={item.id} style={{ color: '#6B7280' }}>
                    {item.name} - {item.price} Kr
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <button
          style={{
            marginTop: '16px',
            backgroundColor: '#EF4444',
            color: '#ffffff',
            fontWeight: '500',
            padding: '8px 16px',
            borderRadius: '6px',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#DC2626'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#EF4444'}
        >
          View All Products
        </button>
      </div>
    </div>
  );
}

export default Dashboard;