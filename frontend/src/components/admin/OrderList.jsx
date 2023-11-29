import { useEffect, useState } from "react";
import { toast } from "react-toastify";
const serverhost = import.meta.env.VITE_SERVERHOST;

const OrderTableRow = ({ order, onUpdateStatus }) => {
  const [isEditing, setEditing] = useState(false);
  const [updatedStatus, setUpdatedStatus] = useState(order.status);

  const handleUpdateStatus = () => {
    onUpdateStatus(order.id, updatedStatus);
    setEditing(false);
  };

  const handleInputChange = (e) => {
    setUpdatedStatus(e.target.value);
  };

  return (
    <tr>
      <td>{order.id}</td>
      <td>{order.username}</td>
      <td>{order.orderdate}</td>
      {isEditing ? (
        <td>
          <select value={updatedStatus} onChange={handleInputChange}>
            <option value="pending">Pending</option>
            <option value="shipped">Shipped</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </td>
      ) : (
        <td>{order.status}</td>
      )}
      <td className="actions">
        {isEditing ? (
          <>
            <button onClick={handleUpdateStatus}>Save</button>
            <button onClick={() => setEditing(false)}>Cancel</button>
          </>
        ) : (
          <button onClick={() => setEditing(true)}>Update Status</button>
        )}
      </td>
    </tr>
  );
};

const OrderList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders from the API
    fetch(`${serverhost}/api/admin/orders`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setOrders(data))
      .catch(() => toast("Error fetching orders: ", { type: "error" }));
  }, []);

  const handleUpdateStatus = (orderId, newStatus) => {
    // Update order status in the API
    fetch(`${serverhost}/api/admin/orders/${orderId}`, {
      method: "PATCH",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status: newStatus }),
    })
      .then((response) => response.json())
      .then((data) =>
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === data.id ? { ...order, status: data.status } : order
          )
        )
      )
      .catch(() => toast("Error updating order status: ", { type: "error" }));
  };

  return (
    <div>
      <h2>Orders</h2>
      <table className="list">
        {/* Table header */}
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Order Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* Table body */}
        <tbody>
          {orders.map((order) => (
            <OrderTableRow
              key={order.id}
              order={order}
              onUpdateStatus={handleUpdateStatus}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
