// src/components/AdminDashboard.js
import React from "react";
import { Container, Typography, Button, Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("isAdmin");
    navigate("/admin/login");
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" gutterBottom>
        Admin Dashboard
      </Typography>
      <Button onClick={handleLogout} variant="contained" color="secondary">
        Logout
      </Button>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <Button
            component={Link}
            to="/admin/categories"
            variant="contained"
            fullWidth
          >
            Manage Categories
          </Button>
        </Grid>
        <Grid item xs={6}>
          <Button
            component={Link}
            to="/admin/items"
            variant="contained"
            fullWidth
          >
            Manage Items
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default AdminDashboard;
