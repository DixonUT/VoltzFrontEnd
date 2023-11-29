import { useEffect, useState } from "react";
import "./OrderHistory.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-content";

const OrderHistory = () => {
  const { isAuthenticated } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const serverhost = import.meta.env.VITE_SERVERHOST;

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrderHistory();
    } else {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const fetchOrderHistory = async () => {
    try {
      const response = await fetch(`${serverhost}/api/checkout-history`, {
        headers: {
          Authorization: localStorage.getItem("token") || "",
        },
      });

      if (response.ok) {
        const data = await response.json();
        setOrders(data);
        console.log(data)
      } else {
        console.error("Error fetching order history:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching order history:", error.message);
    }
  };

  return (
    <div className="order-history-container">
      <h1>Purchase History</h1>
      {orders.map((order) => (
        <div key={order.id} className="order-details">
          <h2>Order Details</h2>
          <p>Purchase Date: {new Date(order.orderdate).toLocaleString()}</p>

          <h2>Order Items</h2>
          <table className="order-items-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Size</th>
                <th>Color</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {order.purchases.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.price}</td>
                  <td>{item.size}</td>
                  <td>{item.color}</td>
                  <td>{item.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
};

export default OrderHistory;
