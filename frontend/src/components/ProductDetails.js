// frontend/src/components/ProductDetails.js
import React, { useState, useEffect } from "react";

import { useParams, useNavigate } from "react-router-dom";

import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useCart } from "../contexts/CartContext";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:4000/api/products/${id}`)
      .then((response) => response.json())
      .then((data) => setProduct(data))
      .catch((error) => console.error("Error fetching product:", error));
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <Card>
      <CardMedia
        component="img"
        height="300"
        image={product.imageUrl}
        alt={product.name}
      />
      <CardContent>
        <Typography variant="h4" component="div">
          {product.name}
        </Typography>
        <Typography variant="h6" color="text.secondary">
          ${product.price}
        </Typography>
        <Typography variant="body1" color="text.primary" paragraph>
          {product.description}
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => {
            addToCart({ ...product, quantity: 1 });
            navigate("/cart"); // Redirect to the cart page
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
