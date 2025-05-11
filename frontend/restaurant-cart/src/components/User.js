import React, { useState } from 'react';

function User({ users, addUser, deleteUser }) {
  const [newUser, setNewUser] = useState({ name: '', email: '' });
  const [editUser, setEditUser] = useState(null);
  const [editForm, setEditForm] = useState({ name: '', email: '' });
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [newPassword, setNewPassword] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    if (newUser.name && newUser.email) {
      addUser({ ...newUser, id: users.length + 1, role: 'user' });
      setNewUser({ name: '', email: '' });
    }
  };

  const handleEditClick = (user) => {
    setEditUser(user);
    setEditForm({ name: user.name, email: user.email });
  };

  const handleEditSave = (e) => {
    e.preventDefault();
    // Logic cập nhật user (giả lập)
    const updatedUsers = users.map(u => u.id === editUser.id ? { ...u, ...editForm } : u);
    // Thay thế bằng API call nếu cần
    console.log('Updated users:', updatedUsers);
    setEditUser(null);
    setEditForm({ name: '', email: '' });
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    // Logic đổi mật khẩu (giả lập)
    if (newPassword) {
      console.log(`Changed password for ${editUser?.name} to: ${newPassword}`);
      setShowChangePassword(false);
      setNewPassword('');
    }
  };

  return (
    <div style={{ marginLeft: '250px', padding: '30px', backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#ef4444', marginBottom: '20px' }}>User Management</h1>

      {/* Form thêm người dùng */}
      <div style={{ marginBottom: '20px', backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#ef4444', marginBottom: '10px' }}>Add New User</h2>
        <form onSubmit={handleAddUser} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={newUser.name}
            onChange={handleInputChange}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={newUser.email}
            onChange={handleInputChange}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}
          />
          <button
            type="submit"
            style={{
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
            Add User
          </button>
        </form>
      </div>

      {/* Danh sách người dùng */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {users.map((user) => (
          <div
            key={user.id}
            style={{
              backgroundColor: '#ffffff',
              padding: '15px',
              borderRadius: '8px',
              border: '1px solid #ddd',
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '5px' }}>
              {user.name}
            </h3>
            <p style={{ fontSize: '14px', color: '#6B7280', marginBottom: '5px' }}>
              Email: {user.email}
            </p>
            <p style={{ fontSize: '14px', color: '#4B5563', marginBottom: '10px' }}>
              Role: {user.role}
            </p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => handleEditClick(user)}
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
                Edit
              </button>
              <button
                onClick={() => deleteUser(user.id)}
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
                Delete
              </button>
              <button
                onClick={() => { setEditUser(user); setShowChangePassword(true); }}
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
                Change Password
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Form chỉnh sửa */}
      {editUser && !showChangePassword && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#ef4444', marginBottom: '10px' }}>
            Edit User
          </h2>
          <form onSubmit={handleEditSave} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="text"
              name="name"
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <input
              type="email"
              name="email"
              value={editForm.email}
              onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{
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
                Save
              </button>
              <button
                onClick={() => setEditUser(null)}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6B7280',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#4B5563'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6B7280'}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Form đổi mật khẩu */}
      {editUser && showChangePassword && (
        <div style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: '#ffffff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          zIndex: 1000,
        }}>
          <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#ef4444', marginBottom: '10px' }}>
            Change Password
          </h2>
          <form onSubmit={handleChangePassword} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}
            />
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                type="submit"
                style={{
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
                Save
              </button>
              <button
                onClick={() => { setShowChangePassword(false); setNewPassword(''); }}
                style={{
                  padding: '8px 16px',
                  backgroundColor: '#6B7280',
                  color: '#ffffff',
                  border: 'none',
                  borderRadius: '6px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#4B5563'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#6B7280'}
              >
                Cancel
              </button>
            </div>
          </form>
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
            div[style*='grid-template-columns'] {
              grid-template-columns: 1fr;
            }
            form {
              flex-direction: column;
            }
            input, button {
              width: 100%;
              margin-bottom: 10px;
            }
            div[style*='position: fixed'] {
              width: 90%;
              padding: 15px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default User;