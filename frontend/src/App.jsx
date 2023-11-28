import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import SignUpForm from "./components/LoginPage";
import Header from "./components/Header";
import AboutPage from "./components/AboutPage";
import CartPage from "./components/CartPage";
import ContactPage from "./components/ContactPage";
import Footer from "./components/Footer";
import Navigation from "./components/Navigation";
import Product from "./components/ProductPage";
import { CartProvider } from "./context/cart-context";
import ProductDetail from "./components/PruductDetail";
import { ProductProvider } from "./context/product-context";
import Registration from "./components/RegisterPage";
import { AuthProvider } from "./context/auth-content";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import OrderHistory from "./components/order-history/OrderHistory";
import AdminDashboard from "./components/admin";

const App = () => {
  return (
    <AuthProvider>
      <ProductProvider>
        <CartProvider>
          <ToastContainer />
          <Router>
            <div className="app">
              <Header />
              <Navigation />
              <Routes>
                <Route path="/" exact element={<Product />} />
                <Route path="/products" element={<Product />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/login" element={<SignUpForm />} />
                <Route path="/register" element={<Registration />} />
                <Route
                  path="/products/:productId"
                  element={<ProductDetail />}
                />
                <Route path="/order-history" element={<OrderHistory />} />
                <Route path="/admin/*" element={<AdminDashboard />} />
              </Routes>
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </ProductProvider>
    </AuthProvider>
  );
};

export default App;
