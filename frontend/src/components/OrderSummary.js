// frontend/src/components/OrderSummary.js
import React from "react";
import { useCart } from "../contexts/CartContext";
import { Typography, Paper, Grid, Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

const OrderSummary = () => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();

  const handlePlaceOrder = () => {
    // Simulate order placement
    alert("Order placed successfully!");
    clearCart(); // Clear the cart
    navigate("/categories"); // Redirect to categories page
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 800, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Order Summary
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h6">Selected Products</Typography>
          {cartItems.map((item) => (
            <Box
              key={item._id}
              sx={{ display: "flex", justifyContent: "space-between", my: 2 }}
            >
              <Typography>{item.name}</Typography>
              <Typography>Quantity: {item.quantity}</Typography>
              <Typography>
                ${(item.price * item.quantity).toFixed(2)}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
            <Typography variant="h6">Total:</Typography>
            <Typography variant="h6">${getCartTotal().toFixed(2)}</Typography>
          </Box>
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
};

export default OrderSummary;
