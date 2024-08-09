// frontend/src/components/ProductDetails.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Container,
  Grid,
  Box,
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
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Card>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <CardMedia
              component="img"
              height="400"
              image={product.imageUrl}
              alt={product.name}
              sx={{ objectFit: "cover" }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <Box>
                <Typography variant="h4" component="div" gutterBottom>
                  {product.name}
                </Typography>
                <Typography variant="h6" color="text.secondary" gutterBottom>
                  ${product.price.toFixed(2)}
                </Typography>
                <Typography variant="body1" color="text.primary" paragraph>
                  {product.description}
                </Typography>
              </Box>
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => {
                  addToCart({ ...product, quantity: 1 });
                  navigate("/cart"); // Redirect to the cart page
                }}
                sx={{ mt: 2 }}
              >
                Add to Cart
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default ProductDetails;
