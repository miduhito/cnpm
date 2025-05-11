import React from 'react';

function Order({ cartItems, deleteOrder, setCart }) {
  const handleStatusChange = (index, newStatus) => {
    const updatedCart = [...cartItems];
    updatedCart[index].status = newStatus;
    setCart(updatedCart); // Sử dụng setCart để cập nhật state
  };

  return (
    <div className="order-container">
      <h1 className="text-2xl font-bold mb-4">Orders</h1>
      {cartItems.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item, index) => (
            <li key={item.id || index} className="bg-white p-4 rounded-lg shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{item.name} x {item.quantity}</p>
                  <p className="text-gray-600">Price: {item.price} Kr</p>
                  <p className="text-gray-600">Status: {item.status}</p>
                </div>
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(index, e.target.value)}
                  className="p-2 border rounded"
                >
                  <option value="new">New</option>
                  <option value="processing">Processing</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <button
                  onClick={() => deleteOrder(index)}
                  className="ml-2 bg-red-500 text-white p-2 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Order;