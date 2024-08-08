// frontend/src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Categories from "./components/Categories";
import { CartProvider } from "./contexts/CartContext";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <Container>
          <h1 className="text-center my-4">Shoes Store</h1>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </Container>
      </Router>
    </CartProvider>
  );
};

export default App;
