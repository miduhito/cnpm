import React, { useState } from 'react';
import MenuItem from './MenuItem';
import AddToCartPopup from './AddToCartPopup';
import Cart from './Cart';
import { FaFish, FaHamburger, FaPizzaSlice, FaCoffee, FaSearch } from 'react-icons/fa';

function Menu({ menuItems, addToCart, cartItems, completeOrder, role, proceedToPayment, cartID, isLoading, error }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleItemClick = (item) => setSelectedItem(item);

  const handleClosePopup = () => setSelectedItem(null);

  const handleAddToCart = (item, quantity, sideDish) => {
    const cartData = {
      productID: item.id,
      quantity: quantity || 1,
      optionIDs: sideDish?.map(opt => opt.optionID) || [],
    };
    addToCart(cartData);
    setSelectedItem(null);
  };

  const setCart = (updatedCart) => {
    completeOrder(updatedCart);
  };

  const categories = Object.keys(menuItems || {}).map(category => {
    let icon;
    switch (category.toLowerCase()) {
      case 'sea food': icon = <FaFish />; break;
      case 'burgers': icon = <FaHamburger />; break;
      case 'pizzas': icon = <FaPizzaSlice />; break;
      case 'drinks': icon = <FaCoffee />; break;
      default: icon = <FaHamburger />;
    }
    return { name: category, icon };
  });

  const allItems = Object.values(menuItems || {}).flat();
  const filteredItems = searchTerm
    ? { "Search Results": allItems.filter(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) }
    : selectedCategory
      ? { [selectedCategory]: menuItems[selectedCategory] }
      : menuItems || {};

  const handleSearchChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    if (term) {
      const filteredSuggestions = allItems.filter(item => item.name.toLowerCase().includes(term.toLowerCase())).slice(0, 5);
      setSuggestions(filteredSuggestions);
      setSelectedCategory(null); // Reset category khi tìm kiếm
    } else {
      setSuggestions([]);
      setSelectedCategory(null); // Reset khi xóa từ khóa
    }
  };

  const handleSuggestionClick = (item) => {
    setSearchTerm(item.name);
    setSuggestions([]);
    setSelectedCategory(null); // Đảm bảo lọc theo từ khóa
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (!searchTerm) return;
    setSelectedCategory(null); // Xác nhận tìm kiếm, giữ filteredItems hiện tại
  };

  return (
    <div style={{ padding: '30px', backgroundColor: '#f3f3f3', minHeight: '100vh', display: 'flex', gap: '20px' }}>
      <div style={{ flex: 3 }}>
        <div style={{ marginBottom: '30px', position: 'relative' }}>
          <form onSubmit={handleSearchSubmit} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              placeholder="Search products..."
              style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '4px', fontSize: '14px', width: '100%', maxWidth: '300px', backgroundColor: '#ffffff', outline: 'none' }}
              onFocus={(e) => e.target.style.borderColor = '#ef4444'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
            <button
              type="submit"
              style={{ padding: '10px 15px', backgroundColor: '#ef4444', color: '#ffffff', border: 'none', borderRadius: '4px', cursor: 'pointer', transition: 'background-color 0.3s', display: 'flex', alignItems: 'center' }}
              onMouseOver={(e) => e.target.style.backgroundColor = '#dc2626'}
              onMouseOut={(e) => e.target.style.backgroundColor = '#ef4444'}
            >
              <FaSearch style={{ marginRight: '5px' }} /> Search
            </button>
          </form>
          {suggestions.length > 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#ffffff', border: '1px solid #ddd', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 10, maxHeight: '200px', overflowY: 'auto' }}>
              {suggestions.map(item => (
                <div key={item.id} onClick={() => handleSuggestionClick(item)} style={{ padding: '8px 12px', cursor: 'pointer', color: '#1F2937' }} onMouseOver={(e) => e.target.style.backgroundColor = '#f3f3f3'} onMouseOut={(e) => e.target.style.backgroundColor = '#ffffff'}>
                  {item.name} (Kr {item.price}.00)
                </div>
              ))}
            </div>
          )}
          {searchTerm && Object.values(filteredItems)[0]?.length === 0 && (
            <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, backgroundColor: '#ffffff', border: '1px solid #ddd', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 10, padding: '8px 12px', color: '#6B7280' }}>
              No products found
            </div>
          )}
        </div>

        <div style={{ marginBottom: '30px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', marginBottom: '16px' }}>Categories</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '10px' }}>
            {categories.map(category => (
              <div
                key={category.name}
                onClick={() => setSelectedCategory(category.name === selectedCategory ? null : category.name)}
                style={{ backgroundColor: selectedCategory === category.name ? '#ef4444' : '#ffffff', padding: '10px', borderRadius: '8px', border: '1px solid #ddd', textAlign: 'center', cursor: 'pointer', transition: 'all 0.3s', color: selectedCategory === category.name ? '#ffffff' : '#1F2937' }}
                onMouseOver={(e) => { if (selectedCategory !== category.name) { e.currentTarget.style.backgroundColor = '#dc2626'; e.currentTarget.style.color = '#ffffff'; } }}
                onMouseOut={(e) => { if (selectedCategory !== category.name) { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#1F2937'; } }}
              >
                <div style={{ fontSize: '20px', marginBottom: '5px' }}>{category.icon}</div>
                <div style={{ fontSize: '14px', fontWeight: '500' }}>{category.name}</div>
              </div>
            ))}
          </div>
        </div>

        {Object.entries(filteredItems).map(([category, items]) => (
          <div key={category} style={{ marginBottom: '30px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', color: '#1F2937', marginBottom: '16px' }}>{category}</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
              {items && items.length > 0 ? items.map((item, idx) => (
                <MenuItem key={item.id} item={item} index={idx + 1} onItemClick={handleItemClick} onAddToCart={addToCart} />
              )) : <p style={{ color: '#6B7280', textAlign: 'center' }}>Không có sản phẩm nào</p>}
            </div>
          </div>
        ))}
      </div>

      <div style={{ flex: 1, minWidth: '300px' }}>
        <Cart cartItems={cartItems} setCart={setCart} completeOrder={proceedToPayment} cartID={cartID} addToCart={addToCart} isLoading={isLoading} error={error} />
      </div>

      {selectedItem && (
        <AddToCartPopup item={selectedItem} onClose={handleClosePopup} onAddToCart={handleAddToCart} />
      )}

      <style>{`
        @media (max-width: 768px) {
          div[style*='display: flex'] { flex-direction: column; }
          div[style*='flex: 1'] { min-width: 100%; }
          div[style*='grid-template-columns: repeat(auto-fill, minmax(120px, 1fr))'] { grid-template-columns: repeat(auto-fill, minmax(100px, 1fr)); gap: 8px; }
          div[style*='grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))'] { grid-template-columns: repeat(auto-fill, minmax(200px, 1fr)); gap: 15px; }
          form[style*='display: flex'] { flex-direction: column; gap: 10px; }
          input[style*='max-width: 300px'] { max-width: 100%; }
          button[style*='display: flex'] { width: 100%; }
        }
      `}</style>
    </div>
  );
}

export default Menu;