import React, { useState } from 'react';

function Product({ categories, menuItems, addProduct, deleteProduct }) {
  const [newProduct, setNewProduct] = useState({ name: '', price: '', category: categories[0] || '', image: '' });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (newProduct.name && newProduct.price) {
      addProduct(newProduct.category, {
        ...newProduct,
        id: Date.now().toString(),
        price: parseFloat(newProduct.price),
      });
      setNewProduct({ name: '', price: '', category: categories[0] || '', image: '' });
    }
  };

  const filteredProducts = Object.entries(menuItems).reduce((acc, [category, items]) => {
    const filtered = items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
      const matchesPrice = filterPrice === 'all' || 
        (filterPrice === 'low' && item.price < 100) || 
        (filterPrice === 'high' && item.price >= 100);
      const matchesStatus = filterStatus === 'all' || item.status === filterStatus;
      return matchesSearch && matchesCategory && matchesPrice && matchesStatus;
    });
    if (filtered.length > 0) acc[category] = filtered;
    return acc;
  }, {});

  return (
    <div style={{ marginLeft: '250px', padding: '30px', backgroundColor: '#f3f3f3', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#ef4444', marginBottom: '20px' }}>Product Management</h1>

      {/* Thanh điều hướng */}
      <div style={{ marginBottom: '20px', backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            padding: '8px',
            width: '200px',
            marginRight: '15px',
            border: '1px solid #ddd',
            borderRadius: '4px',
          }}
        />
        <select
          value={filterCategory}
          onChange={(e) => setFilterCategory(e.target.value)}
          style={{ padding: '8px', marginRight: '15px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="all">All Categories</option>
          {categories.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
        <select
          value={filterPrice}
          onChange={(e) => setFilterPrice(e.target.value)}
          style={{ padding: '8px', marginRight: '15px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="all">All Prices</option>
          <option value="low">Under 100 Kr</option>
          <option value="high">100 Kr and above</option>
        </select>
        <select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '4px' }}
        >
          <option value="all">All Status</option>
          <option value="available">Available</option>
          <option value="out-of-stock">Out of Stock</option>
        </select>
      </div>

      {/* Form thêm sản phẩm */}
      <div style={{ marginBottom: '20px', backgroundColor: '#ffffff', padding: '15px', borderRadius: '8px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#ef4444', marginBottom: '10px' }}>Add New Product</h2>
        <form onSubmit={handleAddProduct} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={newProduct.name}
            onChange={handleInputChange}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}
          />
          <input
            type="number"
            name="price"
            placeholder="Price (Kr)"
            value={newProduct.price}
            onChange={handleInputChange}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}
          />
          <select
            name="category"
            value={newProduct.category}
            onChange={handleInputChange}
            style={{ padding: '8px', border: '1px solid #ddd', borderRadius: '6px' }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          <input
            type="text"
            name="image"
            placeholder="Image URL"
            value={newProduct.image}
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
            Add Product
          </button>
        </form>
      </div>

      {/* Danh sách sản phẩm */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
        {Object.entries(filteredProducts).map(([category, items]) => (
          items.map((item) => (
            <div
              key={item.id}
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
              <img
                src={item.image || 'https://placehold.co/200x150?text=No+Image'}
                alt={item.name}
                style={{ width: '200px', height: '150px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px' }}
              />
              <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1F2937', marginBottom: '5px' }}>
                {item.name}
              </h3>
              <p style={{ fontSize: '20px', fontWeight: 'bold', color: '#ef4444', marginBottom: '10px' }}>
                {item.price} Kr
              </p>
              <button
                onClick={() => deleteProduct(category, item.id)}
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
            </div>
          ))
        ))}
      </div>

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
            input, select, button {
              width: 100%;
              margin-bottom: 10px;
            }
          }
        `}
      </style>
    </div>
  );
}

export default Product;