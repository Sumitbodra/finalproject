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

function App() {
  return (
    <CartProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/category/:categoryName" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-summary" element={<OrderSummary />} />
        </Routes>
      </Router>
    </CartProvider>
  );
}

export default App;
