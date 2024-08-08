// frontend/src/components/Cart.js
import React from "react";
import { useCart } from "../contexts/CartContext";
import {
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import AddCircleIcon from "@mui/icons-material/AddCircle";

const Cart = () => {
  const { cartItems, removeFromCart, adjustQuantity } = useCart();

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <List>
        {cartItems.map((item) => (
          <ListItem
            key={item._id}
            secondaryAction={
              <>
                <IconButton
                  edge="end"
                  aria-label="decrease"
                  onClick={() => adjustQuantity(item._id, item.quantity - 1)}
                >
                  <RemoveCircleIcon />
                </IconButton>
                <IconButton
                  edge="end"
                  aria-label="increase"
                  onClick={() => adjustQuantity(item._id, item.quantity + 1)}
                >
                  <AddCircleIcon />
                </IconButton>
              </>
            }
          >
            <ListItemText
              primary={item.name}
              secondary={`$${item.price} x ${item.quantity}`}
            />
            <Button
              variant="outlined"
              color="error"
              onClick={() => removeFromCart(item._id)}
            >
              Remove
            </Button>
          </ListItem>
        ))}
      </List>
      <Typography variant="h6" gutterBottom>
        Total: $
        {cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )}
      </Typography>
    </div>
  );
};

export default Cart;
