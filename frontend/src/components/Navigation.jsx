import { Link } from "react-router-dom";
import { useAuth } from "../context/auth-content";

export default function Navigation() {
  const { isAuthenticated, user } = useAuth();
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/products">Products</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/cart">Cart</Link>
      {isAuthenticated && (
        <>
          <Link to="/order-history">Order History</Link>
        </>
      )}
      {user && user.isadmin && (
        <div className="dropdown">
          <button className="dropbtn">Admin</button>
          <div className="dropdown-content">
            <Link to="/admin/products">View Products</Link>
            <Link to="/admin/add-product">Add Product</Link>
            <Link to="/admin/users">View Users</Link>
            <Link to="/admin/orders">View Order</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
