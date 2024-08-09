// frontend/src/components/Cart.js
import React from "react";
import { useCart } from "../contexts/CartContext";
import { useNavigate } from "react-router-dom";

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart, getCartTotal } =
    useCart();

  if (cartItems.length === 0) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <Typography variant="h5">Your cart is empty</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ maxWidth: 800, margin: "auto", mt: 4 }}>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Your Cart
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Product</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="center">Quantity</TableCell>
              <TableCell align="right">Total</TableCell>
              <TableCell align="center">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {cartItems.map((item) => (
              <TableRow key={item._id}>
                <TableCell component="th" scope="row">
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      style={{ width: 50, marginRight: 10 }}
                    />
                    {item.name}
                  </Box>
                </TableCell>
                <TableCell align="right">${item.price.toFixed(2)}</TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() =>
                      updateQuantity(item._id, Math.max(1, item.quantity - 1))
                    }
                  >
                    <RemoveIcon />
                  </IconButton>
                  {item.quantity}
                  <IconButton
                    onClick={() => updateQuantity(item._id, item.quantity + 1)}
                  >
                    <AddIcon />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  ${(item.price * item.quantity).toFixed(2)}
                </TableCell>
                <TableCell align="center">
                  <IconButton
                    onClick={() => removeFromCart(item._id)}
                    color="error"
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Box
        sx={{
          mt: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          Total: ${getCartTotal().toFixed(2)}
        </Typography>
        <Box>
          <Button
            variant="outlined"
            color="secondary"
            onClick={clearCart}
            sx={{ mr: 1 }}
          >
            Clear Cart
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/checkout")}
          >
            Proceed to Checkout
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Cart;
