import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth-content";
import AddProduct from "./AddProduct";
import ProductList from "./ProductList";
import UserList from "./Users";
import { useEffect } from "react";
import OrderList from "./OrderList";

const AdminDashboard = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return (
    <div>
      <h2>Admin Dashboard</h2>
      <Routes>
        <Route path="/products" element={<ProductList />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/users" element={<UserList />} />
        <Route path="/orders" element={<OrderList />} />
        <Route path="*" element={<p>Not Found</p>} />
      </Routes>
    </div>
  );
};

export default AdminDashboard;
