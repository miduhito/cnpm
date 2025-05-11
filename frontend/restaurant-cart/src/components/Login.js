import React, { useState } from 'react';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin({ name: 'Admin', role: 'manager' });
    } else if (username === 'user' && password === 'user') {
      onLogin({ name: 'User', role: 'user' });
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: '100vh', 
      backgroundColor: '#f3f3f3', 
      padding: '20px' 
    }}>
      <div style={{ 
        backgroundColor: '#ffffff', 
        padding: '30px', 
        borderRadius: '8px', 
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', 
        width: '100%', 
        maxWidth: '400px' 
      }}>
        <h1 style={{ 
          fontSize: '28px', 
          fontWeight: 'bold', 
          color: '#ef4444', 
          textAlign: 'center', 
          marginBottom: '20px' 
        }}>
          Login
        </h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '16px',
                outline: 'none',
              }}
              onFocus={(e) => e.target.style.outline = '2px solid #ef4444'}
              onBlur={(e) => e.target.style.outline = 'none'}
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #ddd',
                borderRadius: '6px',
                fontSize: '16px',
                outline: 'none',
              }}
              onFocus={(e) => e.target.style.outline = '2px solid #ef4444'}
              onBlur={(e) => e.target.style.outline = 'none'}
            />
          </div>
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#ef4444',
              color: '#ffffff',
              border: 'none',
              borderRadius: '6px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
            }}
            onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
            onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
          >
            Login
          </button>
        </form>
      </div>

      {/* Responsive design */}
      <style>
        {`
          @media (max-width: 480px) {
            div[style*='max-width: 400px'] {
              max-width: 90%;
              padding: 20px;
            }
            input, button {
              font-size: 14px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Login;