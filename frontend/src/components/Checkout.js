// frontend/src/components/Checkout.js
import React, { useState } from "react";
import { useCart } from "../contexts/CartContext";
import {
  TextField,
  Button,
  Grid,
  Typography,
  Paper,
  Box,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const navigate = useNavigate();
  const { cartItems, getCartTotal } = useCart();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "",
  });

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
    paymentMethod: "credit",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentData({ ...paymentData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Order submitted:", {
      ...formData,
      items: cartItems,
      total: getCartTotal(),
    });

    // Here you would typically send this data to your backend
  };

  const handleReviewOrder = (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      navigate("/order-summary");
    } else {
      setErrors(validationErrors);
    }
  };
  const [errors, setErrors] = useState({});

  const handleBlur = (e) => {
    const { name } = e.target;
    const validationErrors = validateForm();
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  const validateForm = () => {
    const errors = {};
    // Personal Information
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errors.email = "Email is invalid";

    // Address
    if (!formData.address.trim()) errors.address = "Address is required";
    if (!formData.city.trim()) errors.city = "City is required";
    if (!formData.zipCode.trim()) errors.zipCode = "Postal code is required";
    else if (
      !/^[A-Za-z]\d[A-Za-z] \d[A-Za-z]\d$/.test(formData.zipCode.toUpperCase())
    )
      errors.zipCode = "Invalid postal code format";
    if (!formData.country.trim()) errors.country = "Country is required";

    // Payment
    if (!paymentData.cardNumber.trim())
      errors.cardNumber = "Card number is required";
    else if (!/^\d{16}$/.test(paymentData.cardNumber.replace(/\s/g, "")))
      errors.cardNumber = "Invalid card number";
    if (!paymentData.cardName.trim())
      errors.cardName = "Name on card is required";
    if (!paymentData.expiryDate.trim())
      errors.expiryDate = "Expiry date is required";
    else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(paymentData.expiryDate))
      errors.expiryDate = "Invalid expiry date format (MM/YY)";
    if (!paymentData.cvv.trim()) errors.cvv = "CVV is required";
    else if (!/^\d{3,4}$/.test(paymentData.cvv)) errors.cvv = "Invalid CVV";

    return errors;
  };

  return (
    <Paper elevation={3} sx={{ p: 4, maxWidth: 600, mx: "auto", mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Checkout
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={!!errors.address}
              helperText={errors.address}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Postal Code"
              name="zipCode"
              placeholder="A1A 1A1"
              value={formData.zipCode}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={!!errors.zipCode}
              helperText={errors.zipCode}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleChange}
              onBlur={handleBlur}
              required
              error={!!errors.country}
              helperText={errors.country}
            />
          </Grid>
        </Grid>
        <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
          Payment Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <Select
                name="paymentMethod"
                value={paymentData.paymentMethod}
                onChange={handlePaymentChange}
              >
                <MenuItem value="credit">Credit Card</MenuItem>
                <MenuItem value="debit">Debit Card</MenuItem>
                <MenuItem value="paypal">PayPal</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Card Number"
              name="cardNumber"
              value={paymentData.cardNumber}
              onChange={handlePaymentChange}
              onBlur={handleBlur}
              required
              error={!!errors.cardNumber}
              helperText={errors.cardNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Name on Card"
              name="cardName"
              value={paymentData.cardName}
              onChange={handlePaymentChange}
              onBlur={handleBlur}
              required
              error={!!errors.cardName}
              helperText={errors.cardName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Expiry Date"
              name="expiryDate"
              placeholder="MM/YY"
              value={paymentData.expiryDate}
              onChange={handlePaymentChange}
              onBlur={handleBlur}
              required
              error={!!errors.expiryDate}
              helperText={errors.expiryDate}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="CVV"
              name="cvv"
              value={paymentData.cvv}
              onChange={handlePaymentChange}
              onBlur={handleBlur}
              required
              error={!!errors.cvv}
              helperText={errors.cvv}
            />
          </Grid>
        </Grid>
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Order Summary
          </Typography>
          {cartItems.map((item) => (
            <Typography key={item._id}>
              {item.name} - ${item.price} x {item.quantity}
            </Typography>
          ))}
          <Typography variant="h6" mt={2}>
            Total: ${getCartTotal().toFixed(2)}
          </Typography>
        </Box>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
          onClick={handleReviewOrder}
        >
          Review Order
        </Button>
      </form>
    </Paper>
  );
};

export default Checkout;
