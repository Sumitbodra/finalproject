// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Categories from "./components/Categories";
import { CartProvider } from "./contexts/CartContext";
import Checkout from "./components/Checkout";
import OrderSummary from "./components/OrderSummary";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./components/AdminDashboard";
import CategoryManagement from "./components/CategoryManagement";
import ItemManagement from "./components/ItemManagement";
import AdminRoute from "./components/AdminRoute";

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Categories />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryName" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/items"
            element={
              <AdminRoute>
                <ItemManagement />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <CategoryManagement />
              </AdminRoute>
            }
          />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
